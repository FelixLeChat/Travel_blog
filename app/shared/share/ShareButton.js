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

type Props = {
  url: string,
  media: string,
  title: string,
  description: string,
};

type State = {
  isOpen: boolean,
};

class ShareButton extends React.Component<Props, State> {
  state = {
    isOpen: false,
  };

  render() {
    const { url, media, title } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="share-button">
        <div
          className="main-share-button"
          onClick={() => this.setState({ isOpen: !isOpen })}
          onKeyPress={() => {}}
        >
          <ReactSVG src="/static/images/icon/share.svg" />
        </div>
        <div className={`sub-share-button facebook-share-button ${isOpen ? 'opened' : ''}`}>
          <FacebookShareButton url={url}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
        </div>
        <div className={`sub-share-button google-share-button ${isOpen ? 'opened' : ''}`}>
          <GooglePlusShareButton url={url}>
            <GooglePlusIcon size={40} round />
          </GooglePlusShareButton>
        </div>
        {media && (
          <div className={`sub-share-button pinterest-share-button ${isOpen ? 'opened' : ''}`}>
            <PinterestShareButton url={url} media={media} description={title || ''}>
              <PinterestIcon size={40} round />
            </PinterestShareButton>
          </div>
        )}
        <div className={`sub-share-button mail-share-button ${isOpen ? 'opened' : ''}`}>
          <EmailShareButton url={url} subject={title}>
            <EmailIcon size={40} round />
          </EmailShareButton>
        </div>
      </div>
    );
  }
}

export default ShareButton;
