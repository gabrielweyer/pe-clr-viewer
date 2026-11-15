import { Routes } from '@angular/router';
import { ViewerComponent } from './viewer/viewer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { portableExecutableGuard } from '../shared/portable-executable.guard';

export const routes: Routes = [
  { path: 'see', canActivate: [portableExecutableGuard], component: ViewerComponent, runGuardsAndResolvers: 'always' },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
