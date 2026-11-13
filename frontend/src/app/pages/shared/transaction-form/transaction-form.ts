import { Component, inject, input, output, signal } from '@angular/core';
import { TransactionService } from '../../../services/transaction/transaction-service';
import { FormsModule } from '@angular/forms';
import { Alert } from '../alert/alert';
import { Compte, OperationType, Transaction } from '../../../models/banking.model';

@Component({
  imports: [FormsModule, Alert],
  selector: 'app-transaction-form',
  styleUrl: './transaction-form.css',
  templateUrl: './transaction-form.html',
})
export class TransactionForm {
  // services
  
  private transactionService = inject(TransactionService);

  // signal
  loading = signal(false);
  errorMessage = signal('');
  compte = input.required<Compte>();
  transactionEvent = output<Transaction>();
  readonly operationsEnum = OperationType;
  readonly operations = Object.values(this.operationsEnum);

  newTransaction: TransactionDataFormat = {
      operation: null,
      numeroSource: '',
      numeroDestination: '',
      montant: null
  };

  onOperationChange(operation: OperationType | null) {
    // source
    this.newTransaction.numeroSource = operation === OperationType.RETRAIT || operation === OperationType.VIREMENT
            ? this.compte().numero : '';
    // destination
    this.newTransaction.numeroDestination = operation === OperationType.DEPOT ? this.compte().numero : '';
  }

  //
  emitTransactionEvent(transaction: Transaction) {
    this.transactionEvent.emit(transaction);
  }

  //
  createTransaction() {
    //
    if (!this.newTransaction.operation) return;
    
    //
    const { operation, montant } = this.newTransaction;
    if (operation === null || montant === null || montant <= 0) return;

    this.loading.set(true);
    this.errorMessage.set('');
    
    // request
    const request$ = this.getFunctionByOperationType(
        operation,
        this.newTransaction
    );

    request$?.subscribe({
      next: (response) => {
        this.emitTransactionEvent(response.data!);
        this.loading.set(false);
        // clear
        this.clearTransactionData();
      },
      error: (err) => {
        console.error('Une erreur est survenue', err);
        this.errorMessage.set(err.error?.message || 'Une erreur est survenue');
        this.loading.set(false);
      }
    });
  }

  private getFunctionByOperationType(operation: OperationType, transaction: TransactionDataFormat) {
    switch(operation) {
      case OperationType.DEPOT:
        return this.transactionService.deposit({
          numero: transaction.numeroDestination,
          montant: transaction.montant!.toString()
        });
      
      case OperationType.RETRAIT:
        return this.transactionService.withdraw({
          numero: transaction.numeroSource,
          montant: transaction.montant!.toString()
        });
      
      case OperationType.VIREMENT:
        return this.transactionService.transfer({
          numeroSource: transaction.numeroSource,
          numeroDestination: transaction.numeroDestination,
          montant: transaction.montant!.toString()
        });
      

      default:
        return null;
    }
  }

  private clearTransactionData() {
    this.newTransaction = {
      operation: null,
      numeroSource: '',
      numeroDestination: '',
      montant: null
    };
  }
}


interface TransactionDataFormat {
  operation: OperationType | null;
  numeroSource: string;
  numeroDestination: string;
  montant: number | null;
}