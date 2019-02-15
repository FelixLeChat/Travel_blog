// @flow
import React from 'react';
import { withRouter } from 'next/router';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Drawer, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-regular-svg-icons';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import type { UIStore } from '../../models/ui';
import { setMobileMenuOpenedState } from '../../reducers/ui';
import { groupBy } from '../../utils/utils';
import { Link } from '../../../config/routes';

const { SubMenu, ItemGroup } = Menu;
const i18nPrefix = 'navigation/sideMenu';
const i18nCommonPrefix = 'common';

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
  setMobileMenuState: (state: boolean) => void,
};

@withNamespaces([i18nPrefix])
@withRouter
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Header extends React.PureComponent<Props> {
  onClose = () => {
    const { setMobileMenuState } = this.props;
    setMobileMenuState(false);
  };

  render() {
    const {
      t,
      ui: {
        data: { isMobileMenuOpened },
      },
      global: {
        data: { destinations, currentRoute },
      },
    } = this.props;

    let groupedDestinations = {};
    if (destinations) {
      groupedDestinations = groupBy(destinations, 'continent');
    }

    const selectedKeys = [];
    const openedKeys = [];
    if (currentRoute.route.name === 'destination-details') {
      openedKeys.push('sub-destinations');

      if (currentRoute.query.destination) {
        selectedKeys.push(currentRoute.query.destination);
      }
    } else if (currentRoute.route.name === 'destinations-index') {
      openedKeys.push('sub-destinations');
      selectedKeys.push('all-destinations');
    } else if (currentRoute.route.name === 'index') {
      selectedKeys.push('home');
    } else {
      selectedKeys.push(currentRoute.route.name);
    }

    return (
      <Drawer
        title="Traveling Maude"
        placement="left"
        closable
        onClose={this.onClose}
        visible={isMobileMenuOpened}
        className="ant-hidden@s side-menu"
      >
        <Menu
          style={{ width: '100%' }}
          defaultSelectedKeys={['1']}
          selectedKeys={selectedKeys}
          defaultOpenKeys={openedKeys}
          mode="inline"
        >
          <Menu.Item key="home">
            <Link route="index">
              <a>{t(`${i18nPrefix}:navigation.home`)}</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link route="about">
              <a>
                <FontAwesomeIcon icon={faCameraRetro} className="submenu-menu-icon" />
                {t(`${i18nPrefix}:navigation.about`)}
              </a>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub-destinations"
            title={(
              <span>
                <FontAwesomeIcon icon={faMap} className="submenu-menu-icon" />
                {t(`${i18nPrefix}:navigation.destinations`)}
              </span>
)}
          >
            <Menu.Item key="all-destinations">
              <Link route="destinations-index">
                <a>{t(`${i18nPrefix}:navigation.all_destinations`)}</a>
              </Link>
            </Menu.Item>
            {Object.keys(groupedDestinations).map(key => (
              <ItemGroup title={t(`${i18nCommonPrefix}:continents.${key}`)} key={key}>
                {groupedDestinations[key].sort().map(destination => (
                  <Menu.Item key={destination.name}>
                    <Link route="destination-details" params={{ destination: destination.name }}>
                      <a>{t(`${i18nCommonPrefix}:destinations.${destination.name}`)}</a>
                    </Link>
                  </Menu.Item>
                ))}
              </ItemGroup>
            ))}
          </SubMenu>
        </Menu>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            padding: '10px 16px',
            textAlign: 'center',
            left: 0,
            right: 0,
          }}
          className="mobile-sidemenu-socials"
        >
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
        </div>
      </Drawer>
    );
  }
}

export default Header;
