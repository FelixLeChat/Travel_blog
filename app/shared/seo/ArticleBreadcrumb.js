// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';
import type { TFunction } from 'react-i18next';
import { connect } from 'react-redux';

import JsonLd from './JsonLd';

const i18nPrefix = 'seo/breadcrumb';
const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  article: any,
  global: any,
};

const mapStateToProps = state => ({
  global: state.global,
});

@withNamespaces([i18nPrefix, i18nCommonPrefix])
@connect(mapStateToProps)
class ArticleBreadcrumb extends React.PureComponent<Props> {
  render() {
    const {
      t,
      article,
      global: {
        data: { destinations },
      },
    } = this.props;

    const articleData = {
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

    if (article && article.destination_id && article.title && article.slug) {
      let destination = null;
      let destinationTranslation = null;
      for (let i = 0; i < destinations.length; i += 1) {
        if (destinations[i].id === article.destination_id) {
          destination = destinations[i].name;
          destinationTranslation = t(`${i18nCommonPrefix}:destinations.${destination}`);
        }
      }

      articleData.itemListElement.push({
        '@type': 'ListItem',
        position: 2,
        item: {
          '@id': `https://www.travelingmaude.com/destinations/${destination}`,
          name: destinationTranslation,
        },
      });

      articleData.itemListElement.push({
        '@type': 'ListItem',
        position: 3,
        item: {
          '@id': `https://www.travelingmaude.com/destinations/${destination}/${article.slug}`,
          name: article.title,
        },
      });
    }

    return <JsonLd data={articleData} />;
  }
}

export default ArticleBreadcrumb;
