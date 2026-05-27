import { createReducer, on } from '@ngrx/store';
import * as LaunchActions from './launch.actions';
import { Launch } from '../model/Launch.model';

export interface LaunchState {
  launches: Launch[];
  selectedLaunch: Launch | null;
  favoriteIds: string[];
  loading: boolean;
  detailsLoading: boolean;
  error: string | null;
}

export const initialState: LaunchState = {
  launches: [],
  selectedLaunch: null,
  favoriteIds: [],
  loading: false,
  detailsLoading: false,
  error: null,
};

export const launchReducer = createReducer(
  initialState,
  on(LaunchActions.loadLaunches, state => ({...state, loading: true, error: null})),
  on(LaunchActions.loadLaunchesSuccess, (state, { launches }) => ({ ...state, loading: false, launches })),
  on(LaunchActions.loadLaunchesFailure, (state, { error }) => ({ ...state,loading: false,error })),
  on(LaunchActions.loadLaunchDetails, state => ({ ...state,detailsLoading: true,error: null })),
  on(LaunchActions.loadLaunchDetailsSuccess, (state, { launch }) => ({ ...state,detailsLoading: false,selectedLaunch: launch })),
  on(LaunchActions.loadLaunchDetailsFailure, (state, { error }) => ({ ...state, detailsLoading: false, error })),
  
  on(LaunchActions.toggleFavorite, (state, { id }) => ({
    ...state,
    favoriteIds: state.favoriteIds.includes(id)
      ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
      : [...state.favoriteIds, id],
  })),
);