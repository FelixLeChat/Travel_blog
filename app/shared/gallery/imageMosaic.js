// @flow
import React from 'react';
import { Row, Col } from 'antd';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import classnames from 'classnames';

type Image = {
  src: string,
  thumbnail: string,
  height?: number,
  width?: number,
};

type Props = {
  images: Image,
  imageContainer: React.Node,
  className: string,
  maxColumns: number,
  maxRows: number,
};

type State = {
  currentImage: number,
  lightboxIsOpen: boolean,
};

class ImageMosaic extends React.Component<Props, State> {
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
      images, imageContainer, className, maxColumns, maxRows,
    } = this.props;

    if (!images || !imageContainer) return null;

    const photos = images.map((image) => {
      let { thumbnail } = image;
      if ((image.height > 1 || image.width > 1) && image.height !== image.width) {
        const imageSplit = image.src.split('/upload/');
        let height = 600;
        let width = 600;

        if (image.height > image.width) {
          width *= image.width / image.height;
        } else {
          height *= image.height / image.width;
        }

        // Fetch a new rendition of the image
        thumbnail = `${imageSplit[0]}/upload/c_fill,h_${height},w_${width}/${imageSplit[1]}`;
      }

      return {
        src: thumbnail,
        height: image.height ? image.height : 1,
        width: image.width ? image.width : 1,
        fullImage: image.src,
      };
    });

    let maxSmCol = 2;
    let maxMdCol = 3;
    let maxLgCol = 5;
    if (maxColumns > 5) {
      maxLgCol = maxColumns;
      maxMdCol = maxLgCol - 2;
      maxSmCol = maxMdCol - 2;
    }

    return (
      <div className={classnames('image-gallery', className)}>
        <Row>
          <Col span={24} md={0}>
            <Gallery
              photos={
                maxRows
                  ? photos.slice(
                    0,
                    Math.min(Math.floor(photos.length / maxSmCol) * maxSmCol, maxRows * maxSmCol),
                  )
                  : photos
              }
              columns={maxSmCol}
              onClick={this.openLightbox}
              ImageComponent={imageContainer}
            />
          </Col>
          <Col span={0} md={24} lg={0}>
            <Gallery
              photos={
                maxRows
                  ? photos.slice(
                    0,
                    Math.min(Math.floor(photos.length / maxMdCol) * maxMdCol, maxRows * maxMdCol),
                  )
                  : photos
              }
              columns={maxMdCol}
              onClick={this.openLightbox}
              ImageComponent={imageContainer}
            />
          </Col>
          <Col span={0} lg={24}>
            <Gallery
              photos={
                maxRows
                  ? photos.slice(
                    0,
                    Math.min(Math.floor(photos.length / maxLgCol) * maxLgCol, maxRows * maxLgCol),
                  )
                  : photos
              }
              columns={maxLgCol}
              onClick={this.openLightbox}
              ImageComponent={imageContainer}
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

export default ImageMosaic;
