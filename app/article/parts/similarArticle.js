// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';

const i18nPrefix = 'articles/common';

type Props = {
  article: any,
};

@withNamespaces([i18nPrefix])
class SimilarArticle extends React.Component<Props, State> {
  render() {
    const { article } = this.props;
    return <div className="similar-article">{article.title}</div>;
  }
}

export default SimilarArticle;
