import { URL } from "url";

export interface SearchResultEvent {
  id: number;
  url_extension: string;
  name: string;
  address: string;
  cover_photo: string;
  start: string;
  end: string;
  location: string;
  is_cancelled: boolean;
}

export interface SearchResults {
  results: SearchResultEvent[];
}

export interface Event {
  id: number;
  name: string;
  short_description: string;
  long_description: string;
  start: string;
  venue: {
    name: string;
    city: string;
    country: string;
  };
  photo: string;
  venue_name: string;
  ticket_link: string;
  performances_plans: PerformancePlan[];
  performances: {
    start: string;
    end: string;
    areas: Area[];
  };
}

export interface Area {
  id: string;
  name: string;
  performances: PerformancePlan[];
}

export interface PerformancePlan {
  id: number;
  area: number;
  name: string;
  artists: Artist[];
}

export interface PerformancePlan {
  id: number;
  area: number;
  name: string;
  artists: Artist[];
}

export interface Artist {
  id: number;
  name: string;
  photo: string;
  music_styles: string[];
  url_extension: string;
}
