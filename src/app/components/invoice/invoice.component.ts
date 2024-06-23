import { Component, OnInit } from '@angular/core';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [ListInvoiceComponent, RouterOutlet],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit{
  
  constructor(public route: ActivatedRoute){}
  ngOnInit(): void {
    
  }

}
