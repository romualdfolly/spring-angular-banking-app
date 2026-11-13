import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/banking.routes').then(m => m.BANKING_ROUTES)
    },
    {
        path: '**',
        redirectTo: '/'
    }
];