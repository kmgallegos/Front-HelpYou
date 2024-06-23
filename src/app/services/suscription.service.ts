import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Suscription } from '../models/suscription';
import { environment } from '../../environments/environment';
import { SubscriptionTypeDTO } from '../models/SubscriptionTypeDTO';
import { SubscriptionIncomeDTO } from '../models/SubscriptionIncomeDTO';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class SuscriptionService {
  private url = `${base_url}/subscriptions`;
  private listaCambio = new Subject<Suscription[]>();

  constructor(private httpClient: HttpClient) {}

  private getAuthHeaders() {
    const token = (typeof window !== 'undefined') ? sessionStorage.getItem('token') : null;
    return new HttpHeaders({
      'Authorization': token || ''  // Token ya incluye 'Bearer '
    });
  }

  list() {
    return this.httpClient.get<Suscription[]>(this.url, { headers: this.getAuthHeaders() });
  }

  insert(p: Suscription) {
    return this.httpClient.post(this.url, p, { headers: this.getAuthHeaders() });
  }

  setList(listaNueva: Suscription[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.httpClient.get<Suscription>(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  update(c: Suscription) {
    return this.httpClient.put(`${this.url}/${c.idSubscription}`, c, { headers: this.getAuthHeaders() });
  }
  
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  getSubscriptionTypeDTO(): Observable<SubscriptionTypeDTO[]> {
    return this.httpClient.get<SubscriptionTypeDTO[]>(`${this.url}/activo-por-suscripcion`);
  }

  getSubscriptionIncomeDTO(): Observable<SubscriptionIncomeDTO[]> {
    return this.httpClient.get<SubscriptionIncomeDTO[]>(`${this.url}/incomes`);
  }
}
