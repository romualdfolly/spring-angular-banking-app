import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ServerRoutes } from '../../constants/server-routes';
import { ApiResponse, Transaction } from '../../models/banking.model';

@Service()
export class TransactionService {
    // injection
    private http = inject(HttpClient);

    //
    deposit(request: { numero: string; montant: string }) {
        return this.http.post<ApiResponse<Transaction>>(
            ServerRoutes.Transactions.DEPOSIT,
            request
        );
    }

    //
    withdraw(request: { numero: string; montant: string }) {
        return this.http.post<ApiResponse<Transaction>>(
            ServerRoutes.Transactions.WITHDRAW,
            request
        );
    }

    //
    transfer(request: { numeroSource: string; numeroDestination: string; montant: string }) {
        return this.http.post<ApiResponse<Transaction>>(
            ServerRoutes.Transactions.TRANSFER,
            request
        );
    }

    //
    getTransactions() {
        return this.http.get<ApiResponse<Transaction[]>>(
            ServerRoutes.Transactions.ALL_TRANSACTIONS
        );
    }
}