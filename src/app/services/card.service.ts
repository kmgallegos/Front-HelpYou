import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { card } from '../models/card';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class CardService {

  private url = `${base_url}/cards`;
  private listaCambio = new Subject<card[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<card[]>(this.url);
    
  }
  insert(p: card) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: card[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<card>(`${this.url}/${id}`);
  }
  update(c: card) {
    return this.httpClient.put(this.url, c);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
