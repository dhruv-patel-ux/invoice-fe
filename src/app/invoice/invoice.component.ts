import { Component } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Router } from '@angular/router';
import { Invoice } from '../model/invoice.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CurrencyPipe, DatePipe,  TableModule,
    CardModule,],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  invoices: Invoice[] = [];

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    // private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this.invoiceService.getInvoices().subscribe({
      next: (data:any) => this.invoices = data,
      // error: (error:any) => this.messageService.add({
      //   severity: 'error',
      //   summary: 'Error',
      //   detail: 'Failed to load invoices'
      // })
    });
  }

  viewInvoice(id: number) {
    this.router.navigate(['/invoices', id]);
  }

  downloadPdf(id: number) {
    // Implement PDF download logic
  }
}
