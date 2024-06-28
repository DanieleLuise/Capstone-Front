import { Injectable } from '@angular/core';
import { IUser } from '../models/i-user';
import { JwtHelperService } from '@auth0/angular-jwt';

import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { ILogin } from '../models/i-login';



type AccessData = {
  user:IUser,
  token:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper:JwtHelperService = new JwtHelperService()
  authSubject = new BehaviorSubject<IUser|null>(null);
  private apiUrl = environment.apiUrl;

  user$ = this.authSubject.asObservable()
  isLoggedIn$ = this.user$.pipe(
    map(user => !!user),
    tap(user =>  this.syncIsLoggedIn = user)
  )
  syncIsLoggedIn:boolean = false;


  constructor(
    private http:HttpClient,//per le chiamate http
    private router:Router//per i redirect
  ) {
    this.restoreUser()//come prima cosa controllo se è già attiva una sessione, e la ripristino
   }



registerUrl:string = environment.registerUrl
loginUrl:string = environment.loginUrl

register(user: Partial<IUser>): Observable<any> {
  return this.http.post(`${this.apiUrl}/user/register`, user);
}


login(loginData:ILogin):Observable<AccessData>{
  return this.http.post<AccessData>(this.loginUrl,loginData)
  .pipe(tap(data => {
    console.log('Login response:', data);
    this.authSubject.next(data.user)//comunico al subject che l'utente si è loggato
    localStorage.setItem('accessData', JSON.stringify(data))

    this.autoLogout(data.token)

  }))
}

logout(){

  this.authSubject.next(null)//comunico al subject che l'utente si è sloggato
  localStorage.removeItem('accessData')//cancello i dati dell'utente

  this.router.navigate(['/auth/login'])//mando via l'utente loggato

}

getAccessToken():string{
  const userJson = localStorage.getItem('accessData')//recupero io dati di accesso
  if(!userJson) return ''; //se l'utente non si è mai loggato blocca tutto

  const accessData:AccessData = JSON.parse(userJson)//se viene eseguita questa riga significa che i dati ci sono, quindi la converto da json ad oggetto per permetterne la manipolazione
  if(this.jwtHelper.isTokenExpired(accessData.token)) return ''; //ora controllo se il token è scaduto, se lo è fermiamo la funzione

  return accessData.token
}

autoLogout(jwt: string) {
  // Log the JWT token
  console.log('JWT Token:', jwt);

  // Decode the token to check its contents
  const decodedToken = this.jwtHelper.decodeToken(jwt);
  console.log('Decoded Token:', decodedToken);

  // Get the expiration date from the token
  const expDate = this.jwtHelper.getTokenExpirationDate(jwt);
  if (!expDate) {
    console.error('Expiration date is null. Decoded Token:', decodedToken);
    return;
  }
  const expMs = expDate.getTime() - new Date().getTime(); //sottraggo i ms della data/ora di oggi da quella nel jwt

  //avvio un timer, quando sarà passato il numero di ms necessari per la scadenza del token, avverrà il logout
  setTimeout(() => {
    this.logout()
  }, expMs);
}


restoreUser(){

  const userJson = localStorage.getItem('accessData')//recupero io dati di accesso
  console.log('Restored access data:', userJson);

  if(!userJson) return; //se l'utente non si è mai loggato blocca tutto

  const accessData:AccessData = JSON.parse(userJson)//se viene eseguita questa riga significa che i dati ci sono, quindi la converto da json ad oggetto per permetterne la manipolazione
  console.log('Parsed access data:', accessData)
  if(this.jwtHelper.isTokenExpired(accessData.token))
    console.log('Token is expired');
     return; //ora controllo se il token è scaduto, se lo è fermiamo la funzione
//se nessun return viene eseguito proseguo
  this.authSubject.next(accessData.user)//invio i dati dell'utente al behaviorsubject
  this.autoLogout(accessData.token)//riavvio il timer per la scadenza della sessione

}

errors(err: any) {
  switch (err.error) {
      case "Email and Password are required":
          return new Error('Email e password obbligatorie');
          break;
      case "Email already exists":
          return new Error('Utente esistente');
          break;
      case 'Email format is invalid':
          return new Error('Email scritta male');
          break;
      case 'Cannot find user':
          return new Error('utente inesistente');
          break;
          default:
      return new Error('Errore');
          break;
  }
}


//servizio per il profilo
getUserProfile(): IUser | null {
  const userJson = localStorage.getItem('accessData');
  if (!userJson) return null;

  const accessData: AccessData = JSON.parse(userJson);
  return accessData.user;
}

updateLocalUser(user: IUser) {
  const accessData = JSON.parse(localStorage.getItem('accessData') || '{}');
  accessData.user = user;
  localStorage.setItem('accessData', JSON.stringify(accessData));
  this.authSubject.next(user);
}

}
