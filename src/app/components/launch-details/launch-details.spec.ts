import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom, of } from 'rxjs';

import { Launch } from '../../model/Launch.model';
import * as LaunchActions from '../../state/launch.actions';
import {
  selectDetailsLoading,
  selectError,
  selectFavoriteIds,
  selectSelectedLaunch,
} from '../../state/launch.selectors';
import { LaunchDetailsComponent } from './launch-details';

describe('LaunchDetailsComponent', () => {
  let component: LaunchDetailsComponent;
  let fixture: ComponentFixture<LaunchDetailsComponent>;
  let store: MockStore;

  const selectedLaunch = createLaunch({ id: 'crew-1', name: 'Crew-1' });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchDetailsComponent],
      providers: [
        provideRouter([]),
        provideMockStore(),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: 'crew-1' })),
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectSelectedLaunch, selectedLaunch);
    store.overrideSelector(selectFavoriteIds, ['crew-1']);
    store.overrideSelector(selectDetailsLoading, false);
    store.overrideSelector(selectError, null);

    fixture = TestBed.createComponent(LaunchDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should dispatch loadLaunchDetails with the route id', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(
      LaunchActions.loadLaunchDetails({ id: 'crew-1' }),
    );
  });

  it('should expose launch details and favorite status in the view model', async () => {
    const viewModel = await firstValueFrom(component.viewModel$);

    expect(viewModel.launch).toEqual(selectedLaunch);
    expect(viewModel.isFavorite).toBe(true);
    expect(viewModel.loading).toBe(false);
    expect(viewModel.error).toBeNull();
  });

  it('should not expose a selected launch from a different route id', async () => {
    store.overrideSelector(selectSelectedLaunch, createLaunch({ id: 'other-id' }));
    store.refreshState();

    const viewModel = await firstValueFrom(component.viewModel$);

    expect(viewModel.launch).toBeNull();
  });

  it('should dispatch toggleFavorite with the selected launch id', () => {
    const dispatchSpy = vi.spyOn(store, 'dispatch');

    component.toggleFavorite('crew-1');

    expect(dispatchSpy).toHaveBeenCalledWith(
      LaunchActions.toggleFavorite({ id: 'crew-1' }),
    );
  });

  it('should return a readable status label', () => {
    expect(component.getStatusLabel(true)).toBe('Success');
    expect(component.getStatusLabel(false)).toBe('Failure');
    expect(component.getStatusLabel(null)).toBe('Unknown');
  });

  it('should prefer the large patch image when available', () => {
    expect(component.getPatchUrl(selectedLaunch)).toBe(
      'https://example.com/patch-large.png',
    );
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
