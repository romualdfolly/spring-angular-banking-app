import { Transaction } from './../../models/banking.model';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../shared/loading-component/loading-component';
import { TransactionService } from '../../services/transaction/transaction-service';
import { DatePipe } from '@angular/common';

@Component({
  imports: [LoadingComponent, DatePipe],
  selector: 'app-transactions',
  styleUrl: './transactions.css',
  templateUrl: './transactions.html',
})
export class Transactions {
  //
  private transactionService = inject(TransactionService);

  loading = signal(false);
  transactions = signal<Transaction[]>([]);

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions() {
    this.loading.set(true);

    this.transactionService.getTransactions().subscribe({
      next: (response) => {
        this.transactions.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur récupération transactions', err);
        this.loading.set(false);
      }
    });
  }
}
