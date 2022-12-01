export interface SauceNAOResponse {
  header: ErrorHeader;
  results: SauceNAOResult[];
}

export interface ErrorHeader {
  user_id: string;
  account_type: string;
  short_limit: string;
  long_limit: string;
  long_remaining: number;
  short_remaining: number;
  status: number;
  results_requested: string;
  index: { [key: string]: Index };
  search_depth: string;
  minimum_similarity: number;
  query_image_display: string;
  query_image: string;
  results_returned: number;
}

export interface Index {
  status: number;
  parent_id: number;
  id: number;
  results: number;
}

export interface SauceNAOResult {
  header: ResultHeader;
  data: Data;
}

export interface Data {
  ext_urls?: string[];
  title?: string;
  pixiv_id?: number;
  member_name?: string;
  member_id?: number;
  danbooru_id?: number;
  yandere_id?: number;
  gelbooru_id?: number;
  "anime-pictures_id"?: number;
  creator?: string;
  material?: string;
  characters?: string;
  source?: string;
  path?: string;
  creator_name?: string;
  author_name?: null | string;
  author_url?: string;
  da_id?: string;
  fa_id?: number;
}

export interface ResultHeader {
  similarity: string;
  thumbnail: string;
  index_id: number;
  index_name: string;
  dupes: number;
  hidden: number;
}
