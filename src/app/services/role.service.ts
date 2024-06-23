import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { role } from '../models/role';
import { user } from '../models/user';
import { RoleTypeDTO } from '../models/RoleTypeDTO';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private url = `${base_url}/roles`;
  private listaCambio = new Subject<role[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<role[]>(this.url);
    
  }
  insert(p: role) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: role[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<role>(`${this.url}/${id}`);
  }
  update(c: role) {
    return this.httpClient.put(this.url, c);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  

  getRoleTypeDTO(): Observable<RoleTypeDTO[]> {
    return this.httpClient.get<RoleTypeDTO[]>(`${this.url}/tiposRoles`);
  }
}
