// @flow

type HomeData = {
  themes: any[],
  destinations: any[],
};

export type HomeStore = {
  isLoading: boolean,
  error: any,
  data: HomeData,
};
