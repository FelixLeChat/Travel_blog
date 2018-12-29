// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';

import JsonLd from './JsonLd';

const i18nPrefix = 'seo/breadcrumb';
const i18nCommonPrefix = 'common';

type Props = {
  article: any,
  currentRoute: any,
};

const mapStateToProps = state => ({
  currentRoute: state.global.data.currentRoute,
});

@withNamespaces([i18nPrefix, i18nCommonPrefix])
@connect(mapStateToProps)
class ArticleStructuredData extends React.PureComponent<Props> {
  render() {
    const {
      article,
      currentRoute: {
        parsedUrl: { path },
      },
    } = this.props;

    const articleData = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      headline: '',
      image: [],
      datePublished: '',
      dateModified: '',
      author: {
        '@type': 'Organization',
        name: 'Traveling Maude',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Traveling Maude',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.travelingmaude.com/static/images/logo/logo_3.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.travelingmaude.com${path}`,
      },
    };

    if (article) {
      if (article.title) articleData.headline = article.title;

      if (article.image) articleData.image.push(article.image);

      if (article.top_images) {
        for (let index = 0; index < article.top_images.length; index += 1) {
          articleData.image.push(article.top_images[index]);
        }
      }

      if (article.published_at) {
        articleData.datePublished = article.published_at;
        articleData.dateModified = article.published_at;
      }
    }

    return <JsonLd data={articleData} />;
  }
}

export default ArticleStructuredData;
