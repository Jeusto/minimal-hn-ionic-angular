import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import * as StoriesActions from './stories.actions';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/models/appState.model';
import { selectMainPageStories } from './stories.selectors';
import { StorageService } from 'src/app/services/storage.service';

@Injectable()
export class StoriesEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private storageService: StorageService,
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
            StoriesActions.loadStoryDetailsSuccess({ story: response })
          ),
          catchError((error) =>
            of(StoriesActions.loadStoryDetailsFailure({ error }))
          )
        )
      )
    )
  );

  searchStories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoriesActions.searchStories),
      mergeMap(({ query }) =>
        this.apiService.searchStories(query).pipe(
          map((response) =>
            StoriesActions.searchStoriesSuccess({
              stories: response.hits,
              currentPage: response.page,
              totalPages: response.nbPages,
            })
          ),
          catchError((error) =>
            of(StoriesActions.searchStoriesFailure({ error }))
          )
        )
      )
    )
  );

  toggleBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoriesActions.toggleBookmark),
      switchMap(({ storyId }) => {
        const addBookmarkPromise = this.storageService.toggleBookmark(storyId);
        return from(addBookmarkPromise).pipe(
          switchMap(() => of(StoriesActions.loadBookmarks()))
        );
      })
    )
  );

  loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StoriesActions.loadBookmarks),
      switchMap((_action) => {
        const bookmarkIdsPromise = this.storageService.getBookmarks();
        return from(bookmarkIdsPromise).pipe(
          switchMap((bookmarksIdArray) =>
            this.apiService.getListOfStories(bookmarksIdArray).pipe(
              map((bookmarks) => {
                return StoriesActions.loadBookmarksSuccess({
                  bookmarks: bookmarks.hits,
                });
              }),
              catchError((error) =>
                of(StoriesActions.loadBookmarksFailure({ error }))
              )
            )
          )
        );
      })
    )
  );
}
