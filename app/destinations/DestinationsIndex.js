// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';

const i18nPrefix = 'pages/destinations';

type Props = {
  t: TFunction,
};

@withNamespaces([i18nPrefix])
class DestinationsIndex extends React.Component<Props> {
  render() {
    return <div className="destinations" />;
  }
}

export default DestinationsIndex;
