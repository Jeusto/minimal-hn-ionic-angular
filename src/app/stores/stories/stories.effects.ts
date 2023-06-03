import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import * as StoriesActions from './stories.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from './stories.models';
import { selectMainPageStories } from './stories.selectors';

@Injectable()
export class StoriesEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<AppState>
  ) {}

  loadStories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoriesActions.loadStories),
      withLatestFrom(this.store.pipe(select(selectMainPageStories))),
      mergeMap(([_action, storiesState]) =>
        this.apiService.getStories(0, storiesState.category).pipe(
          map((response) =>
            StoriesActions.loadStoriesSuccess({
              stories: response.hits,
              currentPage: response.page,
              totalPages: response.nbPages,
            })
          ),
          catchError((error) =>
            of(StoriesActions.loadStoriesFailure({ error }))
          )
        )
      )
    )
  );

  loadMoreStories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoriesActions.loadMoreStories),
      withLatestFrom(this.store.pipe(select(selectMainPageStories))),
      mergeMap(([_action, storiesState]) =>
        this.apiService
          .getStories(storiesState.currentPage + 1, storiesState.category)
          .pipe(
            map((response) =>
              StoriesActions.loadStoriesSuccess({
                stories: response.hits,
                currentPage: response.page,
                totalPages: response.nbPages,
              })
            ),
            catchError((error) =>
              of(StoriesActions.loadStoriesFailure({ error }))
            )
          )
      )
    )
  );

  loadStoryDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoriesActions.loadStoryDetails),
      mergeMap(({ storyId: id }) =>
        this.apiService.getStoryDetails(id).pipe(
          map((response) =>
            StoriesActions.loadStoryDetailsSuccess({ story: response.hits[0] })
          ),
          catchError((error) =>
            of(StoriesActions.loadStoryDetailsFailure({ error }))
          )
        )
      )
    )
  );
}
