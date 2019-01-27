// @flow
import React from 'react';
import AD from 'react-google-publisher-tag';

const SideArticlePageAd = () => (
  <div style={{ textAlign: 'center' }}>
    {typeof window !== 'undefined' && (
      <AD path="/21784165674/article_side_ad" id="div-gpt-ad-1546916012144-0" />
    )}
  </div>
);

export default SideArticlePageAd;
