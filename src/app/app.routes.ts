import { Routes } from '@angular/router';
import { SuscriptionComponent } from './components/suscription/suscription.component';
import { CreateSuscriptionComponent } from './components/suscription/create-suscription/create-suscription.component';
import { CounselingComponent } from './components/counseling/counseling.component';
import { CreateCounselingComponent } from './components/counseling/create-counseling/create-counseling.component';
import { ReportsComponent } from './components/reports/reports.component';
import { Report02Component } from './components/reports/report02/report02.component';

export const routes: Routes = [
    {
        path: 'suscriptions',
        component: SuscriptionComponent,
        children: [
            { path: 'registersuscriptions', component: CreateSuscriptionComponent },
            { path: 'ediciones/:id', component: CreateSuscriptionComponent  }
        ],
       
    },
    
    {
        path:'counselings', component: CounselingComponent,
        children: [
           { path: 'registerCounseling', component: CreateCounselingComponent},
           { path: 'ediciones/:id', component: CreateCounselingComponent  }
        ],
        
    },  
    {
        path: 'repo', component: ReportsComponent,
        children:[
            {path: 'registerReport02', component: Report02Component},
            
            
           
        ]
    }
];
