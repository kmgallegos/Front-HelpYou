import { Service } from "./service";
import { user } from "./user";

export class Suscription {

    idSubscription: number=0;
    
    dataStartSubscription: Date=new Date(Date.now());
    
    subscriptionEndDate: Date=new Date(Date.now());
    
    typeSubscription: string="";
    
    statusSubscription: string="";
   
    priceSubscription: string="";


    user: user=new user ();
    service: Service=new Service();

}