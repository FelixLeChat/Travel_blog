// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { Row, Col } from 'antd';
import Container from '../components/Container';
import ImageMosaic from '../shared/gallery/imageMosaic';
import PolaroidStyleImage from '../shared/gallery/polaroidStyleImage';

const i18nPrefix = 'about';
const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  global: GlobalStore,
};

const mapStateToProps = state => ({
  global: state.global,
});

@connect(mapStateToProps)
@withNamespaces([i18nPrefix, i18nCommonPrefix])
class AboutIndex extends React.Component<Props> {
  render() {
    const {
      t,
      global: {
        data: { imageGallery },
      },
    } = this.props;

    return (
      <Container>
        <Row>
          <Col span={24} md={16} style={{ zIndex: 1 }}>
            <div
              className="about-hero"
              style={{
                backgroundImage:
                  'url(https://res.cloudinary.com/heyjltyh0/image/upload/v1549499514/Hero/about_hero.jpg)',
              }}
            />
          </Col>
          <Col span={24} md={8} className="about-text">
            <div className="ext-box">
              <div className="int-box">
                <Row type="flex" justify="center" align="top">
                  <Col span={16} style={{ position: 'relative' }}>
                    <div
                      className="about-avatar"
                      style={{
                        backgroundImage:
                          'url(https://res.cloudinary.com/heyjltyh0/image/upload/v1549500010/Hero/profile_2.jpg)',
                      }}
                    />
                    <div className="about-avatar-background" />
                  </Col>
                  <Col span={16} className="ant-text-center">
                    <div
                      className="ant-margin-top"
                      dangerouslySetInnerHTML={{ __html: t(`${i18nPrefix}:about`) }}
                    />
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col span={0} md={24}>
            <div className="about-color" />
          </Col>
          <Col span={24} className="ant-margin-large-top ant-margin-large-bottom">
            <ImageMosaic
              images={imageGallery}
              imageContainer={PolaroidStyleImage}
              maxColumns={7}
              maxRows={1}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AboutIndex;
