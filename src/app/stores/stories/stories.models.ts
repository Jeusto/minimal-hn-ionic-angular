export interface AppState {
  stories: {
    list: Story[];
    currentPage: number;
    totalPages: number;
    loading: boolean;
    error: any | null;
  };
  selectedStory: {
    story: Story | null;
    comments: Comment[];
    currentPage: number;
    totalPages: number;
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
}

export interface Story {
  created_at: string;
  title: string;
  url: string;
  author: string;
  points: number;
  story_text: null;
  comment_text: null;
  num_comments: number;
  story_id: null;
  story_title: null;
  story_url: null;
  parent_id: null;
  created_at_i: number;
  _tags: string[];
  objectID: string;
  _highlightResult: {
    title: Highlight;
    url: Highlight;
    author: Highlight;
  };
}

export interface Comment {
  id: string;
  parent_id: string;
  text: string;
  authior: string;
}

interface Highlight {
  value: string;
  matchLevel: string;
  matchedWords: string[];
}
