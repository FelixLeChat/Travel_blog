// @flow
import React from 'react';
import { connect } from 'react-redux';

import ShareButton from '../share/ShareButton';

type Props = {
  article: any,
  currentRoute: any,
};

const mapStateToProps = state => ({
  currentRoute: state.global.data.currentRoute,
});

@connect(mapStateToProps)
class ArticleShareButton extends React.Component<Props> {
  render() {
    const { article, currentRoute } = this.props;
    return (
      <div className="article-share-button">
        <ShareButton
          url={
            currentRoute
              ? encodeURI(`https://www.travelingmaude.com${currentRoute.parsedUrl.path}`)
              : ''
          }
          media={article.image}
          title={article.title}
        />
      </div>
    );
  }
}

export default ArticleShareButton;
