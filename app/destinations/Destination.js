// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import { Row, Col } from 'antd';
import type { DestinationStore } from '../models/destination';
import { Link } from '../../config/routes';
import Container from '../components/Container';
import ArticleCard from '../shared/articles/ArticleCard';
import MapSider from '../shared/menus/MapSider';

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
class Destination extends React.Component<Props> {
  render() {
    const {
      t,
      destination: {
        data: { destination, hero, articles },
      },
    } = this.props;

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
              <div className="destination-articles">
                {articles
                  && articles.map(article => (
                    <div className="ant-margin-bottom" key={article.id}>
                      <ArticleCard article={article} />
                    </div>
                  ))}
              </div>
            </Col>
            <Col span={0} lg={8}>
              <MapSider destination={destination} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Destination;
