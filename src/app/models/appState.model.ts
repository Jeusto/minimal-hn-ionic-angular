import { ApiStoryDetails } from './api.model';
import { Category, Story } from './stories.model';

export interface AppState {
  stories: {
    category: Category;
    list: Story[];
    currentPage: number;
    totalPages: number;
    loading: boolean;
    error: any | null;
  };
  selectedStory: {
    story: ApiStoryDetails | null;
    loading: boolean;
    error: any | null;
  };
  searchResults: {
    list: Story[];
    currentPage: number;
    totalPages: number;
    loading: boolean;
    error: any | null;
  };
  bookmarks: {
    list: Story[];
    loading: boolean;
    error: any | null;
  };
}
