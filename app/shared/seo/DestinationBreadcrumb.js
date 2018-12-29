// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';
import type { TFunction } from 'react-i18next';

import JsonLd from './JsonLd';

const i18nPrefix = 'seo/breadcrumb';
const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  destination: string,
};

@withNamespaces([i18nPrefix, i18nCommonPrefix])
class DestinationBreadcrumb extends React.PureComponent<Props> {
  render() {
    const { destination, t } = this.props;

    const destinationData = {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@id': 'https://www.travelingmaude.com/destinations',
            name: t(`${i18nPrefix}:destinations`),
          },
        },
      ],
    };

    if (destination) {
      destinationData.itemListElement.push({
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': `https://www.travelingmaude.com/destinations/${destination}`,
          name: t(`${i18nCommonPrefix}:destinations.${destination}`),
        },
      });
    }

    return <JsonLd data={destinationData} />;
  }
}

export default DestinationBreadcrumb;
