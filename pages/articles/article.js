// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { I18nProps } from 'react-i18next';

import { fetchArticleStart } from '../../app/reducers/article';
import { withI18next } from '../../lib/withI18next';
import SEOHead from '../../app/shared/seo/SEOHead';
import { i18nextNamespaces } from '../../app/utils';
import Article from '../../app/article/article';
import ArticleBreadcrumb from '../../app/shared/seo/ArticleBreadcrumb';
import ArticleStructuredData from '../../app/shared/seo/ArticleStructuredData';

type Props = {
  i18n: I18nProps,
  currentRoute: Object,
  currentArticle: any,
};

const mapStateToProps = state => ({
  currentRoute: state.global.data.currentRoute,
  currentArticle: state.article,
});

@withI18next(i18nextNamespaces)
@connect(mapStateToProps)
class ArticlePage extends React.Component<Props> {
  static async getInitialProps({ store, query }: any) {
    await store.dispatch(fetchArticleStart({ params: query }));
    return {};
  }

  render() {
    const {
      i18n,
      currentRoute,
      currentArticle: {
        data: { article },
      },
    } = this.props;
    return (
      <>
        {article && (
          <SEOHead
            title={`${article.title} | Traveling Maude`}
            description={article.description}
            currentLocale={i18n.language}
            currentUrl={currentRoute ? currentRoute.parsedUrl.path : ''}
            shareImageLink={article.image}
          />
        )}
        {article && <Article />}

        {article && <ArticleBreadcrumb article={article} />}
        {article && <ArticleStructuredData article={article} />}
      </>
    );
  }
}

export default ArticlePage;
