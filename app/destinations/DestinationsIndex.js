// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-regular-svg-icons';

import { Link } from '../../config/routes';
import Container from '../components/Container';
import { groupBy } from '../utils/utils';

const i18nPrefix = 'pages/destinations';
const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  global: any,
};

const mapStateToProps = state => ({
  global: state.global,
});

@withNamespaces([i18nPrefix])
@connect(mapStateToProps)
class DestinationsIndex extends React.Component<Props> {
  render() {
    const {
      t,
      global: {
        data: { destinations },
      },
    } = this.props;

    let groupedDestinations = {};
    if (destinations) {
      groupedDestinations = groupBy(destinations, 'continent');
    }

    return (
      <div className="destinations">
        <div className="destinations-hero">
          <div className="ext-box ant-text-center" style={{ height: '100%' }}>
            <div className="int-box">
              <h1>{t(`${i18nPrefix}:destinations`)}</h1>
              <div className="breadcrumb">
                <Link route="index">
                  <a>{t(`${i18nPrefix}:beadcrumb.home`)}</a>
                </Link>
                <span> / </span>
                <Link route="destinations-index">
                  <a>{t(`${i18nPrefix}:beadcrumb.destinations`)}</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Container className="ant-margin-large-top ant-margin-medium-bottom destinations-body">
          {Object.keys(groupedDestinations).map(key => (
            <Row key={key}>
              <Col span={24}>
                <div className="destinations-continent-title">
                  <FontAwesomeIcon icon={faMap} />
                  {t(`${i18nCommonPrefix}:continents.${key}`)}
                </div>
                <Row>
                  {groupedDestinations[key].sort().map(destination => (
                    <Col span={24} sm={12} md={8} key={destination.name}>
                      <Link route="destination-details" params={{ destination: destination.name }}>
                        <a>
                          <div className="destinations-card">
                            <div
                              className="destinations-card-image"
                              style={{ backgroundImage: `url(${destination.thumbnail})` }}
                            />
                            <div className="destinations-card-text">
                              <div className="ext-box" style={{ height: '100%' }}>
                                <div className="int-box">
                                  {t(`${i18nCommonPrefix}:destinations.${destination.name}`)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    );
  }
}

export default DestinationsIndex;
