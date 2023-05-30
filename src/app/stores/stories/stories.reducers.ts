import { createReducer, on } from '@ngrx/store';
import { Story } from './stories.model';
import * as StoryActions from './stories.actions';

export interface StoriesState {
  stories: Story[] | null;
  loading: boolean;
  error: any;
}

const initialState: StoriesState = {
  stories: null,
  loading: false,
  error: null,
};

export const storyReducer = createReducer(
  initialState,
  on(StoryActions.loadStories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(StoryActions.loadStoriesSuccess, (state, { stories }) => ({
    ...state,
    stories,
    loading: false,
  })),
  on(StoryActions.loadStoriesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
