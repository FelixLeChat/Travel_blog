// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';

const i18nPrefix = 'pages/home';
const i18nCommonPrefix = 'common';

type Props = {};

@withNamespaces([i18nPrefix, i18nCommonPrefix])
class Destination extends React.Component<Props> {
  render() {
    return <div className="destination">TEST</div>;
  }
}

export default Destination;
