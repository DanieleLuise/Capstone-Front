import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IUser } from '../models/i-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  updateProfile(id: number, user: IUser): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/user/${id}`, user);
  }

  uploadAvatar(userId: number, file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

  let stAccessData = localStorage.getItem('accessData'); // Assumi che il token sia salvato con questo nome
  const accessData = JSON.parse(stAccessData||'')
 const token = accessData.token;
 const headers = new HttpHeaders({
   'Authorization': `Bearer ${token}`
 });



    return this.http.post<{ url: string }>(`${this.apiUrl}/user/${userId}/avatar`, formData, { headers });
  }




}
