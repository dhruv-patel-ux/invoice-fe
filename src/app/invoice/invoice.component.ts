import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Router, RouterLink } from '@angular/router';
import { Invoice } from '../model/invoice.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputIcon, InputIconModule } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, TableModule,
    RouterLink,
    ButtonModule,
    InputIcon, IconField, InputTextModule,
    CardModule,
    Dialog
  ],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {

  invoices: Invoice[] = [];
  visible: boolean = false;

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    // private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loadInvoices();
  }
  Items = signal([]);

  loadInvoices() {
    this.invoiceService.getInvoices().subscribe({
      next: (data: any) => this.invoices = data,
      // error: (error:any) => this.messageService.add({
      //   severity: 'error',
      //   summary: 'Error',
      //   detail: 'Failed to load invoices'
      // })
    });
  }

  viewInvoice(itmes: any) {
    console.log(itmes);
    
    this.Items.set(itmes)
    this.visible = true;
  }
}
