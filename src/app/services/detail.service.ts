import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Detail } from '../models/detail';
import { HttpClient } from '@angular/common/http';



const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class DetailService {
  private url = `${base_url}/details`;
  private listaCambio = new Subject<Detail[]>();
  constructor(private httpClient: HttpClient) { }
  list() {
    return this.httpClient.get<Detail[]>(this.url);
  }
  insert(p: Detail) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Detail[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Detail>(`${this.url}/${id}`);
  }
}
