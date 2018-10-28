// @flow

type GlobalData = {
  currentRoute: Object,
  languageKeys: string[],
};

export type GlobalStore = {
  isLoading: boolean,
  error: any,
  data: GlobalData,
};
