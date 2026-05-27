import { Routes } from '@angular/router';
import { LaunchesListComponent } from './components/launches-list/launches-list';

export const routes: Routes = [
  { path: '', component: LaunchesListComponent, pathMatch: 'full' },
  {
    path: 'launch/:id',
    loadComponent: () =>
      import('./components/launch-details/launch-details').then(
        (component) => component.LaunchDetailsComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
