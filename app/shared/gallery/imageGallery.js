// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import CustomImage from './customImage';

type Props = {
  global: GlobalStore,
};

type State = {
  currentImage: number,
  lightboxIsOpen: boolean,
};

const mapStateToProps = state => ({
  global: state.global,
});

@connect(mapStateToProps)
class ImageGallery extends React.Component<Props, State> {
  state = {
    currentImage: null,
    lightboxIsOpen: false,
  };

  openLightbox = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  };

  closeLightbox = () => {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  };

  gotoPrevious = () => {
    const { currentImage } = this.state;
    this.setState({
      currentImage: currentImage - 1,
    });
  };

  gotoNext = () => {
    const { currentImage } = this.state;
    this.setState({
      currentImage: currentImage + 1,
    });
  };

  render() {
    const {
      global: {
        data: { imageGallery },
      },
    } = this.props;

    if (!imageGallery) return null;

    const photos = imageGallery.map(image => ({
      src: image.thumbnail,
      height: 1,
      width: 1,
      fullImage: image.src,
    }));

    return (
      <div className="image-gallery">
        <Row>
          <Col span={24} md={0}>
            <Gallery
              photos={photos.slice(0, 3)}
              columns={3}
              onClick={this.openLightbox}
              ImageComponent={CustomImage}
            />
          </Col>
          <Col span={0} md={24} lg={0}>
            <Gallery
              photos={photos.slice(0, 5)}
              columns={5}
              onClick={this.openLightbox}
              ImageComponent={CustomImage}
            />
          </Col>
          <Col span={0} lg={24}>
            <Gallery
              photos={photos}
              columns={7}
              onClick={this.openLightbox}
              ImageComponent={CustomImage}
            />
          </Col>
        </Row>
        <Lightbox
          images={photos.map(x => ({ src: x.fullImage }))}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
    );
  }
}

export default ImageGallery;
