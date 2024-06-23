import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Type_service } from '../models/type_service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TypeServiceService {
  private url = `${base_url}/typeServices`;
  private listaCambio = new Subject<Type_service[]>();

  constructor(private httpClient: HttpClient) { }

  list()
  {
    return this.httpClient.get<Type_service[]>(this.url);
  }

  insert(p:Type_service)
  {
    return this.httpClient.post(this.url, p);
  }

  setList(listaNueva: Type_service[])
  {
    this.listaCambio.next(listaNueva);
  }

  getList()
  {
    return this.listaCambio.asObservable();
  }

  listId(id:number)
  {
    return this.httpClient.get<Type_service>(`${this.url}/${id}`)
  }
  
}
