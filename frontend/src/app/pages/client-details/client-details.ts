import { FormsModule } from '@angular/forms';
import { Alert } from '../shared/alert/alert';
import { Client, Compte } from '../../models/banking.model';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientService } from '../../services/client/client-service';
import { CompteService } from '../../services/compte/compte-service';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { LoadingComponent } from '../shared/loading-component/loading-component';

@Component({
  imports: [FormsModule, RouterLink, LoadingComponent, Alert],
  selector: 'app-client-details',
  styleUrl: './client-details.css',
  templateUrl: './client-details.html',
})
export class ClientDetails implements OnInit {
  // services
  private route = inject(ActivatedRoute);
  private clientService = inject(ClientService);
  private compteService = inject(CompteService);

  loading = signal(false);
  errorMessage = signal('');
  client = signal<Client | null>(null);
  comptes = signal<Compte[]>([]);
  newCompte = { numero: '', clientId: 0 };

  // total
  totalSolde = computed(() =>
    this.comptes().reduce((total, compte) => total + Number(compte.solde), 0)
  );

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const clientId = Number(params.get('id'));

      if (clientId) {
        this.newCompte.clientId = clientId;
        this.loadClientData(clientId);
      }
    });
  }

  loadClientData(clientId: number) {
    this.loading.set(true);

    this.clientService.getClient(clientId).subscribe({
      next: (response) => {
        this.client.set(response.data.client);
        this.comptes.set(response.data.comptes);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur récupération du client', err);
        this.loading.set(false);
      }
    });
  }


  createCompte() {
    this.loading.set(true);
    this.errorMessage.set('');
    //
    this.compteService.createCompte(this.newCompte).subscribe({
      next: () => {
        this.newCompte.numero = '';
        this.loadClientData(this.newCompte.clientId);
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message ?? 'Erreur création client');
        this.loading.set(false);
      }
    });
  }
}
