// @flow
import React from 'react';
import AD from 'react-google-publisher-tag';

const SideDestinationPageAd = () => (
  <div style={{ textAlign: 'center', minWidth: 300, minHeight: 250 }}>
    {typeof window !== 'undefined' && (
      <AD path="/21784165674/destination_side_ad" format="RECTANGLE" />
    )}
  </div>
);

export default SideDestinationPageAd;
