import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { ApiResponse, Client, Compte } from '../../models/banking.model';
import { ServerRoutes } from '../../constants/server-routes';

@Service()
export class ClientService {
    // injection
    private http = inject(HttpClient);


    //
    getClients() {
        return this.http.get<ApiResponse<Client[]>>(ServerRoutes.Clients.GET_ALL);
    }

    // 
    getClient(id: number) {
        return this.http.get<ApiResponse<{ client: Client; comptes: Compte[] }>>(
            ServerRoutes.Clients.GET_BY_ID(id)
        );
    }

    // 
    createClient(client: { nom: string; prenom: string; email: string }) {
        return this.http.post<ApiResponse<Client>>(
            ServerRoutes.Clients.CREATE,
            client
        );
    }
}
