// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  destination: string,
  description?: string,
};

@withNamespaces([i18nCommonPrefix])
class MapSider extends React.Component<Props> {
  render() {
    const { t, destination, description } = this.props;

    let destinationUrl = 'https://res.cloudinary.com/heyjltyh0/image/upload/';
    switch (destination) {
      case 'portugal':
        destinationUrl += 'v1546030451/Map/map_portugal.png';
        break;
      case 'philippines':
        destinationUrl += 'v1546030450/Map/map_philippines.png';
        break;
      case 'italy':
        destinationUrl += 'v1546030449/Map/map_italy.png';
        break;
      case 'holland':
        destinationUrl += 'v1546030449/Map/map_holland.png';
        break;
      case 'denmark':
        destinationUrl += 'v1546030449/Map/map_denmark.png';
        break;
      case 'argentina':
        destinationUrl += 'v1546030449/Map/map_argentina.png';
        break;
      case 'croatia':
        destinationUrl += 'v1546030449/Map/map_croatia.png';
        break;
      case 'greece':
        destinationUrl += 'v1546030449/Map/map_greece.png';
        break;
      case 'vietnam':
        destinationUrl += 'v1546030449/Map/map_vietnam.png';
        break;
      case 'iceland':
        destinationUrl += 'v1546030449/Map/map_iceland.png';
        break;
      case 'switzerland':
        destinationUrl += 'v1555855931/Map/map_switzerland.png';
        break;
      default:
        destinationUrl = '';
    }

    return (
      <div className="map-menu-container ant-margin-left">
        <h3 className="border-bottom-box">
          <FontAwesomeIcon icon={faMapMarkedAlt} />
          {`${t(`${i18nCommonPrefix}:location`)} - ${t(
            `${i18nCommonPrefix}:destinations.${destination}`,
          )}`}
        </h3>
        <div
          className="map-container"
          style={{
            backgroundImage: `url(${destinationUrl})`,
          }}
        />
        {description && <p className="ant-text-center">{description}</p>}
      </div>
    );
  }
}

export default MapSider;
