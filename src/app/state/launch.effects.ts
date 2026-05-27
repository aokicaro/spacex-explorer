import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { SpacexService } from '../services/spacex';
 import * as LaunchActions from './launch.actions';


@Injectable()
export class LaunchEffects {
	private readonly actions$ = inject(Actions);
  private readonly spacexService = inject(SpacexService);

  loadLaunches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LaunchActions.loadLaunches),
      switchMap(() =>
        this.spacexService.getPastLaunches().pipe(
          map((launches) =>
            LaunchActions.loadLaunchesSuccess({ launches }),
          ),
          catchError((error: unknown) =>
            of(
              LaunchActions.loadLaunchesFailure({
                error: this.getErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  loadLaunchDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LaunchActions.loadLaunchDetails),
      switchMap(({ id }) =>
        this.spacexService.getLaunchById(id).pipe(
          map((launch) =>
            LaunchActions.loadLaunchDetailsSuccess({ launch }),
          ),
          catchError((error: unknown) =>
            of(
              LaunchActions.loadLaunchDetailsFailure({
                error: this.getErrorMessage(error),
              }),
            ),
          ),
        ),
      ),
    ),
  );

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    return 'Error loading spaceX data.';
  }
}