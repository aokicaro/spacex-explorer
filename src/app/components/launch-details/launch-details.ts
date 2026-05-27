import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { combineLatest, distinctUntilChanged, filter, map, shareReplay, tap } from 'rxjs';

import { Launch } from '../../model/Launch.model';
import * as LaunchActions from '../../state/launch.actions';
import {
  selectDetailsLoading,
  selectError,
  selectFavoriteIds,
  selectSelectedLaunch,
} from '../../state/launch.selectors';

@Component({
  selector: 'app-launch-details',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './launch-details.html',
  styleUrl: './launch-details.scss',
})
export class LaunchDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  private readonly launchId$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    filter((id): id is string => id !== null),
    distinctUntilChanged(),
    tap((id) => this.store.dispatch(LaunchActions.loadLaunchDetails({ id }))),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly viewModel$ = combineLatest({
    launchId: this.launchId$,
    launch: this.store.select(selectSelectedLaunch),
    favoriteIds: this.store.select(selectFavoriteIds),
    loading: this.store.select(selectDetailsLoading),
    error: this.store.select(selectError),
  }).pipe(
    map(({ launchId, launch, favoriteIds, loading, error }) => ({
      launchId,
      launch: launch?.id === launchId ? launch : null,
      isFavorite: favoriteIds.includes(launchId),
      loading,
      error,
    })),
  );

  toggleFavorite(id: string): void {
    this.store.dispatch(LaunchActions.toggleFavorite({ id }));
  }

  getStatusLabel(success: boolean | null): string {
    if (success === true) {
      return 'Success';
    }

    if (success === false) {
      return 'Failure';
    }

    return 'Unknown';
  }

  getPatchUrl(launch: Launch): string | null {
    return launch.links.patch.large ?? launch.links.patch.small;
  }
}
