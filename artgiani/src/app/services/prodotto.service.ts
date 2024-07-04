import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProdotto } from '../models/i-prodotto';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {
  private prodottiUrl = environment.ProdottiUrl;

  constructor(private http: HttpClient) { }




  private getAuthHeaders(): HttpHeaders {
    const stAccessData = localStorage.getItem('accessData');
    if (!stAccessData) {
      console.error('Access data not found');
      throw new Error('Access data not found');
    }
    const accessData = JSON.parse(stAccessData);
    const token = accessData.token;

    if (!token) {
      console.error('Token not found');
      throw new Error('Token not found');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllProdotti(): Observable<IProdotto[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<IProdotto[]>(`${this.prodottiUrl}`, { headers });
  }

  createProdotto(prodotto: Partial<IProdotto>, files: File[]): Observable<IProdotto> {
    const formData = new FormData();
    formData.append('prodotto', new Blob([JSON.stringify(prodotto)], { type: 'application/json' }));
    files.forEach((file, index) => {
      formData.append(`file`, file, file.name);
    });

    const headers = this.getAuthHeaders();
    return this.http.post<IProdotto>(`${this.prodottiUrl}`, formData, { headers });
  }

  updateProductQuantity(id: number, quantity: number): Observable<IProdotto> {
  const headers = this.getAuthHeaders();
  const payload = { quantity };
  return this.http.put<IProdotto>(`${this.prodottiUrl}/${id}/quantity`, payload, { headers });
}

deleteProdotto(id: number): Observable<void> {
  const headers = this.getAuthHeaders();
  return this.http.delete<void>(`${this.prodottiUrl}/${id}`, { headers });
}


}
