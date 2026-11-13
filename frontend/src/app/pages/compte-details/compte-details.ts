import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { LoadingComponent } from '../shared/loading-component/loading-component';
import { TransactionForm } from '../shared/transaction-form/transaction-form';
import { Compte, OperationType, Transaction } from '../../models/banking.model';
import { CompteService } from '../../services/compte/compte-service';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  imports: [RouterLink, LoadingComponent, TransactionForm, DatePipe, DecimalPipe],
  selector: 'app-compte-details',
  styleUrl: './compte-details.css',
  templateUrl: './compte-details.html',
})
export class CompteDetails implements OnInit {
  //
  private route = inject(ActivatedRoute);
  private compteService = inject(CompteService);

  loading = signal(false);
  compte = signal<Compte | null>(null);
  transactions = signal<Transaction[]>([]);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const numero = params.get('numero');

      if(numero) {
        this.loadCompteTransactions(numero);
      }
    });
  }

  loadCompteTransactions(numero: string) {
    this.loading.set(true);

    this.compteService.getCompte(numero).subscribe({
      next: (response) => {
        this.compte.set(response.data.compte);
        this.transactions.set(response.data.transactions);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur récupération du compte', err);
        this.loading.set(false);
      }
    });
  }


  updateFrontTransactionsAndCompte(transaction: Transaction) {
    this.transactions.update(transactions => [transaction, ...transactions]);
    //
    this.compte.update(compte => {
      if (!compte) return null;
      const factor = transaction.compteSource === compte.numero ? -1 : 1;
      return { ...compte, solde: (
          Number(compte?.solde) + factor * Number(transaction.montant)
        ).toString()
      };
    });
  }
}
