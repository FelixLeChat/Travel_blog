// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import classnames from 'classnames';
import { Col, Row } from 'antd';

const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  className: string,
};

const images = [
  'https://res.cloudinary.com/heyjltyh0/image/upload/v1550193368/Instagram/lagoons.jpg',
  'https://res.cloudinary.com/heyjltyh0/image/upload/v1550193290/Instagram/porto.jpg',
  'https://res.cloudinary.com/heyjltyh0/image/upload/v1550193534/Instagram/quebec.jpg',
  'https://res.cloudinary.com/heyjltyh0/image/upload/v1550193468/Instagram/horses.jpg',
  'https://res.cloudinary.com/heyjltyh0/image/upload/v1550193141/Instagram/black_beach.jpg',
  'https://res.cloudinary.com/heyjltyh0/image/upload/v1550193080/Instagram/puffin.jpg',
  'https://res.cloudinary.com/heyjltyh0/image/upload/v1550192950/Instagram/profile_1.jpg',
  'https://res.cloudinary.com/heyjltyh0/image/upload/v1550193031/Instagram/Iceland_1.jpg',
  'https://res.cloudinary.com/heyjltyh0/image/upload/v1550193721/Instagram/trevi.jpg',
];

@withNamespaces([i18nCommonPrefix])
class InstagramSider extends React.Component<Props> {
  render() {
    const { t, className } = this.props;

    return (
      <div className={classnames('instagram-menu ant-margin-left', className)}>
        <h3 className="border-bottom-box">
          <FontAwesomeIcon icon={faInstagram} />
          {t(`${i18nCommonPrefix}:instagram`)}
        </h3>
        <div className="instagram-container">
          <a
            href="https://www.instagram.com/traveling_maude/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <Row gutter={4}>
              {images.map((image, i) => (
                <Col key={`instagram-image-${i}`} span={8} style={{ marginBottom: 4 }}>
                  <img src={image} alt="instagram collection" />
                </Col>
              ))}
            </Row>
          </a>
        </div>
      </div>
    );
  }
}

export default InstagramSider;
