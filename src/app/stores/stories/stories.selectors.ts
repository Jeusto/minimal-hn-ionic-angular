import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/models/appState.model';

const selectStoriesState = createFeatureSelector<AppState>('stories');
export const selectMainPageStories = createSelector(
  selectStoriesState,
  (state: AppState) => state.stories
);

const selectSelectedStoryState = createFeatureSelector<AppState>('stories');
export const selectSelectedStory = createSelector(
  selectSelectedStoryState,
  (state: AppState) => state.selectedStory
);

const selectSearchResultsState = createFeatureSelector<AppState>('stories');
export const selectSearchPageResults = createSelector(
  selectSearchResultsState,
  (state: AppState) => state.searchResults
);

const selectBookmarksState = createFeatureSelector<AppState>('stories');
export const selectBookmarks = createSelector(
  selectBookmarksState,
  (state: AppState) => state.bookmarks
);
