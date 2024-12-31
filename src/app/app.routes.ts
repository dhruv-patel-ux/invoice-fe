import { Routes } from '@angular/router';
import { CreateComponent } from './invoice/create/create.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:"full",
        redirectTo:"invoices"
    },
    {
        path:"invoices",
        loadComponent :() => import('./invoice/invoice.component').then( c => c.InvoiceComponent),
     },
    {
        path:"create-invoices",
        loadComponent :() => import('./invoice/create/create.component').then( c => c.CreateComponent)
    }
];
