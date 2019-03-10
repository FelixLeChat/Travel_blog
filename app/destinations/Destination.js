// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-regular-svg-icons';

import type { DestinationStore } from '../models/destination';
import { Link } from '../../config/routes';
import Container from '../components/Container';
import ArticleCard from '../shared/articles/ArticleCard';
import MapSider from '../shared/menus/MapSider';
import SideDestinationPageAd from '../ads/sideDestinationPageAd';
import { compareValues } from '../utils/utils';
import AdsSider from '../ads/AdsSider';
import ImageMosaic from '../shared/gallery/imageMosaic';
import RegularStyleImage from '../shared/gallery/regularStyleImage';

const i18nPrefix = 'pages/destination';

type Props = {
  t: TFunction,
  destination: DestinationStore,
};

const mapStateToProps = state => ({
  destination: state.destination,
});

@withNamespaces([i18nPrefix])
@connect(mapStateToProps)
class Destination extends React.PureComponent<Props> {
  formattedImages = [];

  constructor(props) {
    super(props);
    this.initialiseFormattedImages(props);
  }

  componentWillReceiveProps(nextProps) {
    this.initialiseFormattedImages(nextProps);
  }

  initialiseFormattedImages = (props) => {
    const {
      destination: {
        data: { images },
      },
    } = props;

    if (images) {
      this.formattedImages = images.map(image => ({
        ...image,
        width: 1,
        height: 1,
      }));
    }
  };

  render() {
    const {
      t,
      destination: {
        data: {
          destination, description, hero, articles,
        },
      },
    } = this.props;

    const sortedArticles = articles.sort(compareValues('published_at', 'desc'));

    return (
      <div className="destination">
        {hero && (
          <div className="destination-hero" style={{ backgroundImage: `url(${hero})` }}>
            <div className="ext-box ant-text-center" style={{ height: '100%' }}>
              <div className="int-box">
                <h1>{t(`${i18nPrefix}:hero.${destination}.title`)}</h1>
                <div className="breadcrumb">
                  <Link route="index">
                    <a>{t(`${i18nPrefix}:beadcrumb.home`)}</a>
                  </Link>
                  <span> / </span>
                  <Link route="destinations-index">
                    <a>{t(`${i18nPrefix}:beadcrumb.destinations`)}</a>
                  </Link>
                  <span> / </span>
                  <Link route="destination-details" params={{ destination }}>
                    <a>{t(`${i18nPrefix}:hero.${destination}.title`)}</a>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="ext-box ant-text-center hero-text-background"
              style={{ height: '100%' }}
            >
              <div className="int-box">
                <h2>{t(`${i18nPrefix}:hero.${destination}.title`)}</h2>
              </div>
            </div>
          </div>
        )}
        <Container className="ant-margin-large-top ant-margin-medium-bottom destination-body">
          <Row>
            <Col md={24} lg={16}>
              <div className="ant-hidden@m ant-text-center ant-margin-medium-bottom">
                <p>{description}</p>
              </div>
              <div className="destination-articles">
                {sortedArticles
                  && sortedArticles.map(article => (
                    <div className="ant-margin-bottom" key={article.id}>
                      <ArticleCard article={article} />
                    </div>
                  ))}
              </div>
            </Col>
            <Col span={0} lg={8}>
              <MapSider destination={destination} description={description} />
              <AdsSider ads={<SideDestinationPageAd />} className="ant-margin-top" />
            </Col>
            {this.formattedImages
              && this.formattedImages.length > 4 && (
                <Col span={24} className="ant-margin-large-top ant-margin-medium-bottom">
                  <h3 className="border-bottom-box">
                    <FontAwesomeIcon icon={faImages} />
                    {t(`${i18nPrefix}:gallery`)}
                  </h3>
                  <ImageMosaic
                    images={this.formattedImages}
                    imageContainer={RegularStyleImage}
                    maxColumns={8}
                    maxRows={3}
                  />
                </Col>
            )}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Destination;
