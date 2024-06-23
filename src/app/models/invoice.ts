import { user } from "./user"
export class Invoice
{
    idInvoice:number=0
    dateInvoice:Date = new Date(Date.now())
    totalInvoice: number=0
    user: user = new user();
}