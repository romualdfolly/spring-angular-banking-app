import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ApiResponse, Compte, Transaction } from '../../models/banking.model';
import { ServerRoutes } from '../../constants/server-routes';

@Service()
export class CompteService {
    // injection
    private http = inject(HttpClient);

    //
    createCompte(request: { numero: string; clientId: number }) {
        return this.http.post<ApiResponse<Compte>>(
            ServerRoutes.Accounts.CREATE,
            request
        );
    }

    //
    getCompte(numero: string) {
        return this.http.get<ApiResponse<{ compte: Compte; transactions: Transaction[]}>>(
            ServerRoutes.Accounts.GET_BY_NUMERO(numero)
        );
    }

    //
    getComptes() {
        return this.http.get<ApiResponse<Compte[]>>(
            ServerRoutes.Accounts.ALL_COMPTES
        );
    }
}