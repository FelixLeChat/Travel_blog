// @flow

type DestinationData = {
  destination: string,
  hero: string,
};

export type DestinationStore = {
  isLoading: boolean,
  error: any,
  data: DestinationData,
};
