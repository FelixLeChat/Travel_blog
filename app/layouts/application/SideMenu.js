// @flow
import React from 'react';
import { withRouter } from 'next/router';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Drawer } from 'antd';

import type { UIStore } from '../../models/ui';

const i18nPrefix = 'navigation/sideMenu';

const mapStateToProps = state => ({
  ui: state.ui,
});

type Props = {
  ui: UIStore,
};

@withNamespaces([i18nPrefix])
@withRouter
@connect(mapStateToProps)
class Header extends React.PureComponent<Props> {
  onClose = () => {};

  render() {
    const {
      ui: {
        data: { isMobileMenuOpened },
      },
    } = this.props;
    return (
      <Drawer
        title="Traveling Maude"
        placement="left"
        closable
        onClose={this.onClose}
        visible={isMobileMenuOpened}
        className="ant-hidden@s"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    );
  }
}

export default Header;
