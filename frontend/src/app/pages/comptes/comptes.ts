import { Component, inject, OnInit, signal } from '@angular/core';
import { CompteService } from '../../services/compte/compte-service';
import { Compte } from '../../models/banking.model';
import { RouterLink } from '@angular/router';
import { LoadingComponent } from '../shared/loading-component/loading-component';

@Component({
  imports: [RouterLink, LoadingComponent],
  selector: 'app-comptes',
  styleUrl: './comptes.css',
  templateUrl: './comptes.html',
})
export class Comptes implements OnInit {
  //
  private compteService = inject(CompteService);

  loading = signal(false);
  comptes = signal<Compte[]>([]);

  ngOnInit(): void {
    this.loadComptes();
  }

  loadComptes() {
    this.loading.set(true);

    this.compteService.getComptes().subscribe({
      next: (response) => {
        this.comptes.set(response.data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erreur récupération comptes', err);
        this.loading.set(false);
      }
    });
  }
}
