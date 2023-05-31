import { createAction, props } from '@ngrx/store';
import { Story } from './stories.models';

export const loadStories = createAction(
  '[Stories] Load Stories',
  props<{ page: number }>()
);
export const loadStoriesSuccess = createAction(
  '[Stories] Load Stories Success',
  props<{ stories: Story[]; currentPage: number; totalPages: number }>()
);
export const loadStoriesFailure = createAction(
  '[Stories] Load Stories Failure',
  props<{ error: string }>()
);

export const loadStoryDetails = createAction(
  '[Stories] Load Story Details',
  props<{ storyId: string }>()
);
export const loadStoryDetailsSuccess = createAction(
  '[Stories] Load Story Details Success',
  props<{ story: Story }>()
);
export const loadStoryDetailsFailure = createAction(
  '[Stories] Load Story Details Failure',
  props<{ error: string }>()
);

export const searchStories = createAction(
  '[Stories] Search Stories',
  props<{ query: string }>()
);
export const searchStoriesSuccess = createAction(
  '[Stories] Search Stories Success',
  props<{ stories: Story[]; currentPage: number; totalPages: number }>()
);
export const searchStoriesFailure = createAction(
  '[Stories] Search Stories Failure',
  props<{ error: string }>()
);
