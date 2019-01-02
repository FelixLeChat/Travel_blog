// @flow
import React from 'react';
import ReactSVG from 'react-svg';
import {
  FacebookShareButton,
  FacebookIcon,
  GooglePlusShareButton,
  GooglePlusIcon,
  PinterestShareButton,
  PinterestIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import copy from 'copy-to-clipboard';
import { Tooltip } from 'antd';

type Props = {
  url: string,
  media: string,
  title: string,
  copyLinkText: string,
  shareOpenFunction: () => void,
  shareClickFunction: (name: string) => void,
};

type State = {
  isOpen: boolean,
};

class ShareButton extends React.Component<Props, State> {
  state = {
    isOpen: false,
  };

  handleSocialMediaShareClick = () => {
    const { isOpen } = this.state;
    const { shareOpenFunction } = this.props;

    // Trigger event for analytics
    if (!isOpen && shareOpenFunction) {
      shareOpenFunction();
    }

    this.setState({ isOpen: !isOpen });
  };

  handleSocialMediaClick = (name) => {
    const { shareClickFunction } = this.props;

    if (shareClickFunction) {
      shareClickFunction(name);
    }
  };

  handleCopyLink = () => {
    const { url } = this.props;
    copy(url);
  };

  render() {
    const {
      url, media, title, copyLinkText,
    } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="share-button">
        <div
          className="main-share-button"
          onClick={this.handleSocialMediaShareClick}
          onKeyPress={() => {}}
        >
          <ReactSVG src="/static/images/icon/share.svg" />
        </div>
        <div className={`sub-share-button facebook-share-button ${isOpen ? 'opened' : ''}`}>
          <FacebookShareButton
            url={url}
            beforeOnClick={() => this.handleSocialMediaClick('Facebook')}
          >
            <FacebookIcon size={40} round />
          </FacebookShareButton>
        </div>
        <div className={`sub-share-button google-share-button ${isOpen ? 'opened' : ''}`}>
          <GooglePlusShareButton
            url={url}
            beforeOnClick={() => this.handleSocialMediaClick('Google+')}
          >
            <GooglePlusIcon size={40} round />
          </GooglePlusShareButton>
        </div>
        {media && (
          <div className={`sub-share-button pinterest-share-button ${isOpen ? 'opened' : ''}`}>
            <PinterestShareButton
              url={url}
              media={media}
              description={title ? `${title} | Traveling Maude` : ''}
              beforeOnClick={() => this.handleSocialMediaClick('Pinterest')}
            >
              <PinterestIcon size={40} round />
            </PinterestShareButton>
          </div>
        )}
        <div className={`sub-share-button mail-share-button ${isOpen ? 'opened' : ''}`}>
          <EmailShareButton
            url={url}
            subject={title}
            beforeOnClick={() => this.handleSocialMediaClick('Email')}
          >
            <EmailIcon size={40} round />
          </EmailShareButton>
        </div>
        <div className={`sub-share-button link-share-button ${isOpen ? 'opened' : ''}`}>
          <Tooltip placement="left" title={copyLinkText} trigger="click">
            <div
              className="link-button"
              onClick={() => {
                this.handleCopyLink();
                this.handleSocialMediaClick('link');
              }}
              onKeyPress={() => {}}
            >
              <FontAwesomeIcon icon={faLink} />
            </div>
          </Tooltip>
        </div>
      </div>
    );
  }
}

export default ShareButton;
