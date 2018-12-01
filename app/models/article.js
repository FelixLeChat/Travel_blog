// @flow

export type ArticleData = {
  id: number,
  title: string,
  image: string,
  theme_id: number,
  destination_id: number,
  content: string,
  top_title: string,
  top_items: strin[],
};

export type ArticleStore = {
  isLoading: boolean,
  error: any,
  data: ArticleData,
};
