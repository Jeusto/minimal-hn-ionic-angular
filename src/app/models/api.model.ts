import { Story } from './stories.model';

export interface ApiSearchResponse {
  hits: Story[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: {
    nbHits: boolean;
    typo: boolean;
  };
  query: string;
  params: string;
  processingTimeMS: number;
  processingTimingsMS: {
    afterFetch?: { total: number };
    request: {
      roundTrip: number;
    };
    total: number;
  };
  serverTimeMS: number;
}

export interface ApiStoryDetails {
  id: number;
  created_at: string;
  created_at_i: number;
  type: string;
  author: string;
  title: string;
  url: string;
  text: string;
  points: number;
  parent_id: number | null;
  story_id: number | null;
  children: ApiStoryDetails[];
  options: string[];
}
