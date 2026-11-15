import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { portableExecutableGuard } from '../shared/portable-executable.guard';

export const routes: Routes = [
  { path: 'see', canActivate: [portableExecutableGuard], loadComponent: () => import('./viewer/viewer.component').then(m => m.ViewerComponent), runGuardsAndResolvers: 'always' },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
