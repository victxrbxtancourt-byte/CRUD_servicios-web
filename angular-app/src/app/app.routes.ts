import { Routes } from '@angular/router';
import { ClientesPage } from './clientes.page';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes', pathMatch: 'full' },
  { path: 'clientes', component: ClientesPage },
];
