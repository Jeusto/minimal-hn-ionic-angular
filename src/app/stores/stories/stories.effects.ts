import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import * as StoriesActions from './stories.actions';

@Injectable()
export class StoriesEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadStories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoriesActions.loadStories),
      mergeMap((action) =>
        this.apiService.getFrontPageStories(action.page).pipe(
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
