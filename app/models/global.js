// @flow

type GlobalData = {
  currentRoute: Object,
  languageKeys: string[],
  themes: any[],
  destinations: any[],
};

export type GlobalStore = {
  isLoading: boolean,
  error: any,
  data: GlobalData,
};
