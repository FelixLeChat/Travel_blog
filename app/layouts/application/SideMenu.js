// @flow
import React from 'react';
import { withRouter } from 'next/router';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Drawer, Menu } from 'antd';

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
  i18n: I18nProps,
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
      i18n,
      ui: {
        data: { isMobileMenuOpened },
      },
      global: {
        data: { destinations },
      },
    } = this.props;
    const locale = i18n.language;

    let groupedDestinations = {};
    if (destinations) {
      groupedDestinations = groupBy(destinations, 'continent');
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
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <SubMenu key="sub1" title="Destinations">
            {Object.keys(groupedDestinations).map(key => (
              <ItemGroup title={t(`${i18nCommonPrefix}:continents.${key}`)} key={key}>
                {groupedDestinations[key].sort().map(destination => (
                  <Menu.Item key={destination.name}>
                    <Link
                      route="destination-details"
                      params={{ locale, destination: destination.name }}
                    >
                      <a>{t(`${i18nCommonPrefix}:destinations.${destination.name}`)}</a>
                    </Link>
                  </Menu.Item>
                ))}
              </ItemGroup>
            ))}
          </SubMenu>
        </Menu>
      </Drawer>
    );
  }
}

export default Header;
