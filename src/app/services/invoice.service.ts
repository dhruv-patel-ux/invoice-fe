import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../model/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiUrl = 'http://localhost:3000/invoice';

  constructor(private http: HttpClient) {}

  createInvoice(invoice: Partial<Invoice>): Observable<Invoice> {
    return this.http.post<Invoice>(this.apiUrl, invoice);
  }

  getInvoices(sort: 'ASC' | 'DESC' = 'DESC'){
    return this.http.get(`${this.apiUrl}?sort=${sort}`);
  }

  getInvoice(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`);
  }
}
