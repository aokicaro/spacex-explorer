import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

import { Launch } from '../../model/Launch.model';
import * as LaunchActions from '../../state/launch.actions';
import { selectAllLaunches, selectError, selectFavoriteIds, selectIsLoading } from '../../state/launch.selectors';

@Component({
  selector: 'app-launches-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule,  MatIconModule, MatChipsModule, MatButtonModule],
  templateUrl: './launches-list.html',
  styleUrl: './launches-list.scss',
})
export class LaunchesListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly searchTermSubject = new BehaviorSubject<string>('');

  searchTerm: string = '';

  readonly viewModel$ = combineLatest({
    launches: this.store.select(selectAllLaunches),
    favoriteIds: this.store.select(selectFavoriteIds),
    loading: this.store.select(selectIsLoading),
    error: this.store.select(selectError),
    searchTerm: this.searchTermSubject,
  }).pipe(
    map(({ launches, searchTerm, ...state }) => ({
      ...state,
      launches: this.filterLaunches(launches, searchTerm),
    })),
  );

  ngOnInit(): void {
    this.store.dispatch(LaunchActions.loadLaunches());
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.searchTermSubject.next(searchTerm);
  }

  toggleFavorite(id: string): void {
    this.store.dispatch(LaunchActions.toggleFavorite({ id }));
  }

  trackByLaunchId(_: number, launch: Launch): string {
    return launch.id;
  }

  private filterLaunches(launches: Launch[], searchTerm: string): Launch[] {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return launches;
    }

    return launches.filter((launch) =>
      launch.name.toLowerCase().includes(normalizedSearch),
    );
  }
}
