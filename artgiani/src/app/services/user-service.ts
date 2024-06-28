import { HttpClient } from '@angular/common/http';
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
  uploadAvatar(username: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/user/${username}/avatar`, formData);
  }
  updateProfileWithAvatar(userId: number, formData: FormData): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/user/${userId}`, formData);
  }

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/user/${id}`);
  }


}
