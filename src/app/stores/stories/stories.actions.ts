import { ApiStoryDetails } from 'src/app/models';
import { createAction, props } from '@ngrx/store';
import type { Story, Category } from 'src/app/models';

export const loadStories = createAction('[Stories] Load Stories');
export const loadMoreStories = createAction('[Stories] Load More Stories');
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
  props<{ story: ApiStoryDetails }>()
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

export const updateStoriesCategory = createAction(
  '[Stories] Update Stories Category',
  props<{ category: Category }>()
);

export const loadBookmarks = createAction('[Stories] Load Bookmarks');
export const toggleBookmark = createAction(
  '[Stories] Add Bookmark',
  props<{ storyId: string }>()
);
export const loadBookmarksSuccess = createAction(
  '[Stories] Load Bookmarks Success',
  props<{ bookmarks: Story[] }>()
);
export const loadBookmarksFailure = createAction(
  '[Stories] Load Bookmarks Failure',
  props<{ error: string }>()
);
