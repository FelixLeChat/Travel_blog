// @flow
import React from 'react';

type Props = {
  data: any,
};

/* eslint-disable */
const JsonLd = ({ data }: Props) => (
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
);
/* eslint-enable */

export default JsonLd;
