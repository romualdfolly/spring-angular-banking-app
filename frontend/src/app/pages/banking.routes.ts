import { Routes } from '@angular/router';

export const BANKING_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full'
  },
  {
    path: 'clients',
    loadComponent: () => import('./clients/clients').then(m => m.Clients),
  },
  {
    path: 'clients/:id',
    loadComponent: () =>import('./client-details/client-details').then(m => m.ClientDetails),
  },
  {
    path: 'comptes',
    loadComponent: () => import('./comptes/comptes').then(m => m.Comptes),
  },
  {
    path: 'comptes/:numero',
    loadComponent: () => import('./compte-details/compte-details').then(m => m.CompteDetails),
  },
  {
    path: 'transactions',
    loadComponent: () => import('./transactions/transactions').then(m => m.Transactions),
  }
];