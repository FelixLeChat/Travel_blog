// @flow
import React from 'react';
import { connect } from 'react-redux';
// import { withNamespaces } from 'react-i18next';

type Props = {
  // t: TFunction,
  // i18n: I18nProps,
  article: any,
};

const mapStateToProps = state => ({
  destination: state.destination,
});

// @withNamespaces([i18nPrefix])
@connect(mapStateToProps)
class ArticleCard extends React.Component<Props> {
  render() {
    const { article } = this.props;
    // const locale = i18n.language;

    return (
      <div className="article-card">
        <div className="article-card-image" style={{ backgroundImage: `url(${article.image})` }} />
        <div className="article-card-content">{article.title}</div>
      </div>
    );
  }
}

export default ArticleCard;
