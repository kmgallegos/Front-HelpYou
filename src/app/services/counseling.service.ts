import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Counseling } from '../models/counseling';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { CounselingByUserDTO } from '../models/CounselingByUserDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class CounselingService {
  private url = `${base_url}/counselings`;
  private listaCambio = new Subject<Counseling[]>();

  constructor(private httpClient: HttpClient) {}

  private getAuthHeaders() {
    const token = (typeof window !== 'undefined') ? sessionStorage.getItem('token') : null;
    return new HttpHeaders({
      'Authorization': token || ''  // Token ya incluye 'Bearer '
    });
  }

  list() {
    return this.httpClient.get<Counseling[]>(this.url, { headers: this.getAuthHeaders() });
  }

  insert(p: Counseling) {
    return this.httpClient.post(this.url, p, { headers: this.getAuthHeaders() });
  }

  setList(listaNueva: Counseling[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  listId(id: number) {
    return this.httpClient.get<Counseling>(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  update(c: Counseling) {
    return this.httpClient.put(`${this.url}/${c.idCounseling}`, c, { headers: this.getAuthHeaders() });
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`, { headers: this.getAuthHeaders() });
  }

  getCounselingByUserDTO(): Observable<CounselingByUserDTO[]> {
    return this.httpClient.get<CounselingByUserDTO[]>(`${this.url}/citas-por-usuario`);
}
}
