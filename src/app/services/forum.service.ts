import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Forum } from '../models/forum';
import { Subject } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private url=`${base_url}/forums`;
  private listaCambio = new Subject<Forum[]>();

  constructor(private httpClient:HttpClient) { }

  list() {
    return this.httpClient.get<Forum[]>(this.url);
    
  }
  insert(p: Forum) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: Forum[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Forum>(`${this.url}/${id}`);
  }
  update(c: Forum) {
    return this.httpClient.put(this.url, c);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  

  
}
