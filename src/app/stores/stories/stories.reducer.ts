import { createReducer, on } from '@ngrx/store';
import * as StoriesActions from './stories.actions';
import { AppState } from 'src/app/models/appState.model';

export const initialState: AppState = {
  stories: {
    category: 'top',
    list: [],
    currentPage: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
  selectedStory: {
    story: null,
    comments: [],
    currentPage: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
  searchResults: {
    list: [],
    currentPage: 0,
    totalPages: 0,
    loading: false,
    error: null,
  },
  bookmarks: {
    list: [],
    loading: false,
    error: null,
  },
};

export const storiesReducer = createReducer(
  initialState,
  on(StoriesActions.loadStories, (state) => ({
    ...state,
    stories: { ...state.stories, loading: true, error: null },
  })),
  on(
    StoriesActions.loadStoriesSuccess,
    (state, { stories, currentPage, totalPages }) => {
      return {
        ...state,
        stories: {
          ...state.stories,
          list:
            currentPage === 0 ? stories : [...state.stories.list, ...stories],
          currentPage,
          totalPages,
          loading: false,
          error: null,
        },
      };
    }
  ),
  on(StoriesActions.loadStoriesFailure, (state, { error }) => {
    return {
      ...state,
      stories: { ...state.stories, loading: false, error },
    };
  }),

  on(StoriesActions.loadStoryDetails, (state) => ({
    ...state,
    selectedStory: { ...state.selectedStory, loading: true, error: null },
  })),
  on(StoriesActions.loadStoryDetailsSuccess, (state, { story }) => ({
    ...state,
    selectedStory: {
      ...state.selectedStory,
      story,
      loading: false,
      error: null,
    },
  })),
  on(StoriesActions.loadStoryDetailsFailure, (state, { error }) => ({
    ...state,
    selectedStory: { ...state.selectedStory, loading: false, error },
  })),

  on(StoriesActions.searchStories, (state) => ({
    ...state,
    searchResults: { ...state.searchResults, loading: true, error: null },
  })),
  on(
    StoriesActions.searchStoriesSuccess,
    (state, { stories, currentPage, totalPages }) => ({
      ...state,
      searchResults: {
        ...state.searchResults,
        list: stories,
        currentPage,
        totalPages,
        loading: false,
        error: null,
      },
    })
  ),
  on(StoriesActions.searchStoriesFailure, (state, { error }) => ({
    ...state,
    searchResults: { ...state.searchResults, loading: false, error },
  })),

  on(StoriesActions.updateStoriesCategory, (state, { category }) => ({
    ...state,
    stories: { ...state.stories, category },
  }))
);
