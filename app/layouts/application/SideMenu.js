// @flow
import React from 'react';
import { withRouter } from 'next/router';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Drawer } from 'antd';

import type { UIStore } from '../../models/ui';
import { setMobileMenuOpenedState } from '../../reducers/ui';

const i18nPrefix = 'navigation/sideMenu';

const mapStateToProps = state => ({
  ui: state.ui,
});

const mapDispatchToProps = dispatch => ({
  setMobileMenuState: state => dispatch(setMobileMenuOpenedState(state)),
});

type Props = {
  ui: UIStore,
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
