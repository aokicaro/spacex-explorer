import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';

import { Launch } from '../../model/Launch.model';
import * as LaunchActions from '../../state/launch.actions';
import {
  selectAllLaunches,
  selectError,
  selectFavoriteIds,
  selectIsLoading,
} from '../../state/launch.selectors';
import { LaunchesListComponent } from './launches-list';

describe('LaunchesListComponent', () => {
  let component: LaunchesListComponent;
  let fixture: ComponentFixture<LaunchesListComponent>;
  let store: MockStore;

  const launches: Launch[] = [
    createLaunch({ id: 'falconsat', name: 'FalconSat' }),
    createLaunch({ id: 'crew-1', name: 'Crew-1' }),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchesListComponent],
      providers: [provideRouter([]), provideMockStore()],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllLaunches, launches);
    store.overrideSelector(selectFavoriteIds, ['crew-1']);
    store.overrideSelector(selectIsLoading, false);
    store.overrideSelector(selectError, null);

    fixture = TestBed.createComponent(LaunchesListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should dispatch loadLaunches on init', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(LaunchActions.loadLaunches());
  });

  it('should expose a filtered view model based on the search term', async () => {
    component.onSearchChange('crew');

    const viewModel = await firstValueFrom(component.viewModel$);

    expect(viewModel.launches).toEqual([launches[1]]);
    expect(viewModel.favoriteIds).toEqual(['crew-1']);
    expect(viewModel.loading).toBe(false);
    expect(viewModel.error).toBeNull();
  });

  it('should dispatch toggleFavorite with the selected launch id', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.toggleFavorite('falconsat');

    expect(dispatchSpy).toHaveBeenCalledWith(
      LaunchActions.toggleFavorite({ id: 'falconsat' }),
    );
  });

  it('should track launches by id', () => {
    expect(component.trackByLaunchId(0, launches[0])).toBe('falconsat');
  });
});

function createLaunch(overrides: Partial<Launch> = {}): Launch {
  return {
    id: 'launch-id',
    name: 'Launch name',
    flight_number: 1,
    date_local: '2020-01-01T00:00:00-03:00',
    success: true,
    details: 'Launch details',
    links: {
      patch: {
        small: 'https://example.com/patch-small.png',
        large: 'https://example.com/patch-large.png',
      },
      webcast: 'https://example.com/webcast',
      article: 'https://example.com/article',
      wikipedia: 'https://example.com/wiki',
    },
    ...overrides,
  };
}
