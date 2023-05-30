import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StoriesState } from './stories.reducers';

export const selectStoriesState =
  createFeatureSelector<StoriesState>('stories');

export const selectStories = createSelector(
  selectStoriesState,
  (state: StoriesState) => state.stories
);

export const selectLoading = createSelector(
  selectStoriesState,
  (state: StoriesState) => state.loading
);

export const selectError = createSelector(
  selectStoriesState,
  (state: StoriesState) => state.error
);
