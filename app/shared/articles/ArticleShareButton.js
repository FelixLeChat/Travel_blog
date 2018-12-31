// @flow
import React from 'react';
import { connect } from 'react-redux';

import ShareButton from '../share/ShareButton';
import { logEvent } from '../../utils/analytics';

type Props = {
  article: any,
  currentRoute: any,
};

const mapStateToProps = state => ({
  currentRoute: state.global.data.currentRoute,
});

@connect(mapStateToProps)
class ArticleShareButton extends React.Component<Props> {
  handleShareButtonOpen = () => {
    const { article } = this.props;
    logEvent('Article Share Button', 'Open', article.title);
  };

  handleShareButtonClick = (shareButtonName: string) => {
    const { article } = this.props;
    logEvent('Article Share Button', `click - ${shareButtonName}`, article.title);
  };

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
          shareOpenFunction={this.handleShareButtonOpen}
          shareClickFunction={this.handleShareButtonClick}
          copyLinkText="Article link copied"
        />
      </div>
    );
  }
}

export default ArticleShareButton;
