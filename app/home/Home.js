// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';

import { Row, Col } from 'antd';
import Container from '../components/Container';
import type { HomeStore } from '../models/home';
import { groupBy } from '../utils/utils';

const i18nPrefix = 'pages/home';
const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  home: HomeStore,
};

const mapStateToProps = state => ({
  home: state.home,
});

@withNamespaces([i18nPrefix, i18nCommonPrefix])
@connect(mapStateToProps)
class Home extends React.Component<Props> {
  render() {
    const {
      t,
      home: {
        data: { destinations },
      },
    } = this.props;

    let groupedDestinations = {};
    if (destinations) {
      groupedDestinations = groupBy(destinations, 'continent');
    }
    console.log(Object.keys(groupedDestinations));

    return (
      <div className="home">
        <div className="home-brand">
          <h1>{t(`${i18nPrefix}:brand`)}</h1>
        </div>
        <div className="home-hero">
          <Row>
            <Col xs={24} md={16}>
              <div className="home-hero-image" />
            </Col>
            <Col xs={24} md={8}>
              <div className="home-hero-text ext-box">
                <div className="int-box">
                  {/* <h2>{t(`${i18nPrefix}:hero.title`)}</h2>
                  <div className="subtitle">{t(`${i18nPrefix}:hero.subtitle`)}</div>
                  <p className="content">{t(`${i18nPrefix}:hero.text`)}</p> */}
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Container className="ant-margin-medium-top ant-margin-medium-bottom">
          <Row>
            <Col xs={24} md={16}>
              CONTENT
            </Col>
            <Col xs={0} md={8}>
              <div className="home-destinations-container ant-margin-left">
                <h3>{t(`${i18nPrefix}:destinations.title`)}</h3>
                <ul>
                  {Object.keys(groupedDestinations).map(key => (
                    <li key={key}>
                      <div className="continent-name">
                        {t(`${i18nCommonPrefix}:continents.${key}`)}
                      </div>
                      <ul>
                        {groupedDestinations[key].map(destination => (
                          <li key={destination.name}>
                            {t(`${i18nCommonPrefix}:destinations.${destination.name}`)}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
