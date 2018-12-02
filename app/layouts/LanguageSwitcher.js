// @flow
import React from 'react';
import { Menu, Dropdown, Icon } from 'antd';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import moment from 'moment';

import type { I18nProps } from 'react-i18next';
import type { GlobalStore } from '../models/global';

import { Router } from '../../config/routes';

type Props = {
  i18n: I18nProps,
  global: GlobalStore,
};

const menu = onClickHandler => (
  <Menu onClick={onClickHandler()} className="header-language-menu">
    <Menu.Item key="fr" className="header-language-menu-item">
      <a>FR</a>
    </Menu.Item>
    <Menu.Item key="en" className="header-language-menu-item">
      <a>EN</a>
    </Menu.Item>
  </Menu>
);

class LanguageSwitcher extends React.PureComponent<Props> {
  onChangeLocale = ({ key }) => {
    const {
      i18n,
      global: {
        data: { currentRoute },
      },
    } = this.props;

    i18n.changeLanguage(key, () => {
      moment.locale(key);

      Router.pushRoute(currentRoute.route.name, {
        ...currentRoute.query,
        locale: key,
      }).then(() => {
        window.scrollTo(0, 0);
      });
    });
  };

  render() {
    const { i18n } = this.props;

    const locale = i18n.language;

    return (
      <Dropdown
        overlay={menu(() => this.onChangeLocale)}
        placement="bottomRight"
        trigger={['click']}
      >
        <a className="ant-dropdown-link header-link" href="#">
          <span className="ant-text-uppercase">{locale}</span>
          <Icon type="down" />
        </a>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => ({
  global: state.global,
});

export default compose(
  withNamespaces(['header']),
  connect(mapStateToProps),
)(LanguageSwitcher);
