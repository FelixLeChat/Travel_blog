// @flow
import React from 'react';

import GoogleAds from './google/googleAds';

const SideDestinationPageAd = (key: string) => (
  <GoogleAds
    key={key}
    client="ca-pub-7083575751291349"
    slot="1440365567"
    style={{ display: 'block' }}
    format="auto"
    responsive="true"
  />
);

export default SideDestinationPageAd;
