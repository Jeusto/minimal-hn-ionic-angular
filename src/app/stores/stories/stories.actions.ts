import { createAction, props } from '@ngrx/store';
import { Story } from './stories.model';

export const loadStories = createAction('[Stories] Load Stories');

export const loadStoriesSuccess = createAction(
  '[Stories] Load Stories Success',
  props<{ stories: Story[] }>()
);

export const loadStoriesFailure = createAction(
  '[Stories] Load Stories Failure',
  props<{ error: any }>()
);
