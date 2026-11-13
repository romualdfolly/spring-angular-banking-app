import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Alert } from '../shared/alert/alert';
import { Client } from './../../models/banking.model';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ClientService } from '../../services/client/client-service';
import { LoadingComponent } from '../shared/loading-component/loading-component';

@Component({
  imports: [FormsModule, RouterLink, Alert, LoadingComponent],
  selector: 'app-clients',
  styleUrl: './clients.css',
  templateUrl: './clients.html',
})
export class Clients implements OnInit {
  // service 
  private clientService = inject(ClientService);

  loading = signal(false);
  errorMessage = signal('');
  clients = signal<Client[]>([]);
  newClient = {nom: '', prenom: '', email: ''};

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.loading.set(true);

    this.clientService.getClients().subscribe({
      next: (response) => {
        this.clients.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur récupération clients', err);
        this.loading.set(false);
      }
    });
  }


  //
  createClient() {
    this.loading.set(true);
    this.errorMessage.set('');
    //
    this.clientService.createClient(this.newClient).subscribe({
      next: () => {
        this.newClient = { nom: '', prenom: '', email: '' };
        this.loadClients();
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set(err.error?.message ?? 'Erreur création client');
        this.loading.set(false);
      }
    });
  }
}
