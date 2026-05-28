import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/launches-list/launches-list').then(
        (component) => component.LaunchesListComponent,
      ),
  },
  {
    path: 'launch/:id',
    loadComponent: () =>
      import('./components/launch-details/launch-details').then(
        (component) => component.LaunchDetailsComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
