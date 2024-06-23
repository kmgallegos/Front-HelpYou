import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { noti } from "../models/noti";
import { NotificationsPerUserDTO } from "../models/NotificationsPerUserDTO";

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private url = `${base_url}/notifications`;
  private listaCambio = new Subject<noti[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<noti[]>(this.url);
    
  }
  insert(p: noti) {
    return this.httpClient.post(this.url, p);
  }
  setList(listaNueva: noti[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<noti>(`${this.url}/${id}`);
  }
  update(c: noti) {
    return this.httpClient.put(this.url, c);
  }

  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  };

  getNotificationsPerUserDTO(): Observable<NotificationsPerUserDTO[]> {
    return this.httpClient.get<NotificationsPerUserDTO[]>(`${this.url}/Notificacion-por-usuario`);
}
  }

