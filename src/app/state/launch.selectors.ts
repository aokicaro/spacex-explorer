import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LaunchState } from './launch.reducer';

export const selectLaunchState = createFeatureSelector<LaunchState>('launch');

export const selectAllLaunches = createSelector(selectLaunchState, state => state.launches);
export const selectIsLoading = createSelector(selectLaunchState, state => state.loading);
export const selectFavoriteIds = createSelector(selectLaunchState, state => state.favoriteIds);
export const selectSelectedLaunch = createSelector(selectLaunchState, (state) => state.selectedLaunch);
export const selectDetailsLoading = createSelector( selectLaunchState, (state) => state.detailsLoading);
export const selectError = createSelector(selectLaunchState, (state) => state.error);

export const selectFavoriteLaunches = createSelector(
    selectAllLaunches,
    selectFavoriteIds,
    (launches, favoriteIds) =>
      launches.filter((launch) => favoriteIds.includes(launch.id)),
);

export const selectLaunchById = (id: string) =>
  createSelector(
    selectAllLaunches,
    selectSelectedLaunch,
    (launches, selectedLaunch) =>
      selectedLaunch?.id === id
        ? selectedLaunch
        : launches.find((launch) => launch.id === id) ?? null,
  );

export const selectIsFavorite = (id: string) =>
  createSelector(
    selectFavoriteIds,
    (favoriteIds) => favoriteIds.includes(id),
  );