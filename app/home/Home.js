// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';

import { Row, Col } from 'antd';
import Container from '../components/Container';

const i18nPrefix = 'pages/home';

type Props = {
  t: TFunction,
};

@withNamespaces([i18nPrefix])
class Home extends React.Component<Props> {
  render() {
    const { t } = this.props;

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
        <Container />
      </div>
    );
  }
}

export default Home;
