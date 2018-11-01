// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Layout as AntLayout } from 'antd';

import SideMenu from './SideMenu';
// import Footer from './Footer';

const { Content } = AntLayout;

type Props = {
  children: React.Node,
};

const mapStateToProps = state => ({
  global: state.global,
});

const Layout = ({ children }: Props) => (
  <AntLayout style={{ minHeight: '100vh' }}>
    <SideMenu />
    <AntLayout className="content">
      <Content>{children}</Content>
      {/* <Footer /> */}
    </AntLayout>
  </AntLayout>
);

export default connect(mapStateToProps)(Layout);
