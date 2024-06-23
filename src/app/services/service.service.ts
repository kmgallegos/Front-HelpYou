import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Service } from '../models/service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = `${base_url}/services`;
  private listaCambio = new Subject<Service[]>();

  constructor(private httpClient: HttpClient) {}

  private getAuthHeaders() {
    const token = (typeof window !== 'undefined') ? sessionStorage.getItem('token') : null;
    return new HttpHeaders({
      'Authorization': token || '' 
    });
  }

  list() {
    return this.httpClient.get<Service[]>(this.url, { headers: this.getAuthHeaders() });
  }

  insert(p: Service) {
    return this.httpClient.post(this.url, p, { headers: this.getAuthHeaders() });
  }

  setList(listaNueva: Service[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.httpClient.get<Service>(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  update(c: Service) {
    return this.httpClient.put(this.url, c, { headers: this.getAuthHeaders() });
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  
}
