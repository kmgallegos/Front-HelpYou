import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Invoice } from '../models/invoice';
import { HttpClient } from '@angular/common/http';


const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private url = `${base_url}/invoices`
  private listaCambio = new Subject<Invoice[]>();

  constructor(private httpClient:HttpClient) { }

  list() {
    return this.httpClient.get<Invoice[]>(this.url);
  }

  insert(p: Invoice) {
    return this.httpClient.post(this.url, p);
  }

  setList(listaNueva: Invoice[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }
  
  listId(id: number) {
    return this.httpClient.get<Invoice>(`${this.url}/${id}`);
  }

}
