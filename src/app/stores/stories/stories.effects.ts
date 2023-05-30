import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as StoryActions from './stories.actions';

@Injectable()
export class StoriesEffects {
  loadStories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoryActions.loadStories),
      mergeMap(() =>
        this.apiService.getFrontPageStories().pipe(
          map((response) =>
            StoryActions.loadStoriesSuccess({ stories: response.hits })
          ),
          catchError((error) => of(StoryActions.loadStoriesFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
