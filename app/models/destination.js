// @flow
import type { ArticleData } from './article';

type DestinationData = {
  id: number,
  destination: string,
  hero: string,
  articles: ArticleData,
};

export type DestinationStore = {
  isLoading: boolean,
  error: any,
  data: DestinationData,
};
