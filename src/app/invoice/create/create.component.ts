import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule,  
    TableModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    CurrencyPipe,
    InputNumberModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    this.invoiceForm =  this.fb.group({
      fromDetails: this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required]
      }),
      toDetails: this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required]
      }),
      items: this.fb.array([])
    });
  }

  invoiceForm!: FormGroup 


  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {
    const itemForm = this.fb.group({
      itemName: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      rate: [0, [Validators.required, Validators.min(0)]]
    });
    this.items.push(itemForm);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      this.invoiceService.createInvoice(this.invoiceForm.value)
        .subscribe(() => this.router.navigate(['/invoices']));
    }
  }
  calculateItemTotal(itemForm: AbstractControl): number {
    const quantity = itemForm.get('quantity')?.value || 0;
    const rate = itemForm.get('rate')?.value || 0;
    return quantity * rate;
  }

  calculateTotal(): number {
    return this.items.controls.reduce((sum, item) => sum + this.calculateItemTotal(item), 0);
  }
}
