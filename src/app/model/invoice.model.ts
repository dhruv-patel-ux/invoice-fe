export interface Invoice {
    id: number;
    invoiceNumber: string;
    invoiceDate: Date;
    fromName: string;
    fromAddress: string;
    toName: string;
    toAddress: string;
    totalAmount: number;
    items: InvoiceItem[];
  }

  export interface InvoiceItem {
    itemName: string;
    quantity: number;
    rate: number;
    total: number;
  }