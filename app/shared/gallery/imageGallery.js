// @flow
import React from 'react';

type Props = {};

const availablePhotos = [
  {
    src: '',
    thumbnail: '',
  },
];

class DestinationSider extends React.Component<Props> {
  state: {
    photos: null,
  };

  componentWillMount() {
    const photoIdsArray = [];
    while (photoIdsArray.length < 7) {
      const newPhotoId = Math.floor(Math.random() * 30 + 1);
      if (photoIdsArray.indexOf(newPhotoId) < 0) {
        photoIdsArray.push(newPhotoId);
      }
    }

    const photos = photoIdsArray.map(index => ({
      src: availablePhotos[index].thumbnail,
      width: 1,
      height: 1,
    }));

    this.setState({ photos });
  }

  render() {
    return <div className="image-gallery" />;
  }
}

export default DestinationSider;
