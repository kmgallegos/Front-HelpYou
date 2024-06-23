import { Invoice } from "./invoice";
import { Suscription } from "./suscription";


export class Detail
{
    idDetail:number=0
    quantityDetail: number=0
    subTotalDetail: number=0
    subscription: Suscription=new Suscription();
    invoice: Invoice= new Invoice();
}