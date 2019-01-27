// @flow
import React from 'react';
import AD from 'react-google-publisher-tag';

const SideDestinationPageAd = () => (
  <div style={{ textAlign: 'center' }}>
    {typeof window !== 'undefined' && (
      <AD path="/21784165674/destination_side_ad" id="div-gpt-ad-1546917788906-0" />
    )}
  </div>
);

export default SideDestinationPageAd;
