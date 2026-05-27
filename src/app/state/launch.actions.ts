import { createAction, props } from '@ngrx/store';
import { Launch } from '../model/Launch.model';

export const loadLaunches = createAction('[Launch List] Load Launches');
export const loadLaunchesSuccess = createAction('[Launch List] Load Success', props<{ launches: Launch[] }>());
export const loadLaunchesFailure = createAction('[Launch Failure] Load Failure', props<{ error: string }>());
export const loadLaunchDetails = createAction('[Launch Details] Load Launch Details', props<{id: string}>());
export const loadLaunchDetailsSuccess = createAction('[Launch Details] Load Launch Details Success', props<{launch: Launch}>());
export const loadLaunchDetailsFailure = createAction('[Launch Details] Load Launch Details Failure', props<{error: string}>());
export const toggleFavorite = createAction('[Launch] Toogle Favorite Launch', props<{id: string}>());
