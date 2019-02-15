// @flow
import React from 'react';
import { withRouter } from 'next/router';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import {
  Layout, Row, Col, Menu, Icon,
} from 'antd';
import Sticky from 'react-stickynode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import { Link } from '../../../config/routes';
import Container from '../../components/Container';
import { setMobileMenuOpenedState } from '../../reducers/ui';
import type { UIStore } from '../../models/ui';
import type { GlobalStore } from '../../models/global';
import { groupBy } from '../../utils/utils';

const i18nPrefix = 'navigation/header';
const i18nCommonPrefix = 'common';

const AntHeader = Layout.Header;
const { SubMenu, ItemGroup } = Menu;

const mapStateToProps = state => ({
  global: state.global,
  ui: state.ui,
});

const mapDispatchToProps = dispatch => ({
  setMobileMenuState: state => dispatch(setMobileMenuOpenedState(state)),
});

type Props = {
  t: TFunction,
  ui: UIStore,
  global: GlobalStore,
  setMobileMenuState: () => void,
};

@withNamespaces([i18nPrefix])
@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Header extends React.PureComponent<Props> {
  handleMenuTrigger = () => {
    const {
      ui: {
        data: { isMobileMenuOpened },
      },
      setMobileMenuState,
    } = this.props;
    setMobileMenuState(!isMobileMenuOpened);
  };

  render() {
    const {
      t,
      ui: {
        data: { isMobileMenuOpened },
      },
      global: {
        data: { destinations },
      },
    } = this.props;

    let groupedDestinations = {};
    if (destinations) {
      groupedDestinations = groupBy(destinations, 'continent');
    }
    return (
      <Sticky enabled className="header">
        <AntHeader>
          <Container>
            {/* Menu for Desktop app */}
            <Row className="ant-visible@s">
              <Col span={4}>
                <Link route="index">
                  <a>
                    <img
                      src="/static/images/logo/logo_3.png"
                      width="45px"
                      height="45px"
                      alt="Traveling Maude Logo"
                    />
                  </a>
                </Link>
              </Col>
              <Col span={16} className="ant-text-center">
                <Menu mode="horizontal">
                  <Menu.Item key="1">
                    <Link route="index">
                      <a>{t(`${i18nPrefix}:navigation.home`)}</a>
                    </Link>
                  </Menu.Item>
                  <SubMenu key="2" title={t(`${i18nPrefix}:navigation.destinations`)}>
                    <Menu.Item>
                      <Link route="destinations-index">
                        <a>{t(`${i18nPrefix}:navigation.all_destinations`)}</a>
                      </Link>
                    </Menu.Item>
                    {Object.keys(groupedDestinations).map(key => (
                      <ItemGroup title={t(`${i18nCommonPrefix}:continents.${key}`)} key={key}>
                        {groupedDestinations[key]
                          .sort()
                          .filter(destination => destination.name)
                          .map(destination => (
                            <Menu.Item key={destination.name}>
                              <Link
                                route="destination-details"
                                params={{ destination: destination.name }}
                              >
                                <a>{t(`${i18nCommonPrefix}:destinations.${destination.name}`)}</a>
                              </Link>
                            </Menu.Item>
                          ))}
                      </ItemGroup>
                    ))}
                  </SubMenu>
                  <Menu.Item key="3">
                    <Link route="about">
                      <a>{t(`${i18nPrefix}:navigation.about`)}</a>
                    </Link>
                  </Menu.Item>
                </Menu>
              </Col>
              <Col span={4} className="ant-text-right header-icons">
                <a
                  href="https://www.instagram.com/traveling_maude/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                  href="https://www.linkedin.com/company/traveling-maude/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
              </Col>
            </Row>

            {/* Menu for mobile app */}
            <Row className="ant-hidden@s">
              <Col span={24} className="ant-text-center">
                <div
                  className="header-mobile-menu"
                  onClick={this.handleMenuTrigger}
                  onKeyPress={() => {}}
                >
                  {t(`${i18nPrefix}:menu.label`)}
                  <Icon
                    type={`menu-${isMobileMenuOpened ? 'un' : ''}fold`}
                    theme="outlined"
                    style={{ marginLeft: 10 }}
                  />
                </div>
                <Link route="index">
                  <a style={{ marginLeft: -70 }}>
                    <img
                      src="/static/images/logo/logo_3.png"
                      width="45px"
                      height="45px"
                      alt="Traveling Maude Logo"
                    />
                  </a>
                </Link>
              </Col>
            </Row>
          </Container>
        </AntHeader>
      </Sticky>
    );
  }
}

export default Header;
