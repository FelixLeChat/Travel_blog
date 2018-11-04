// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Layout as AntLayout } from 'antd';

import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';

const { Content } = AntLayout;

type Props = {
  children: React.Node,
};

const mapStateToProps = state => ({
  global: state.global,
});

const Layout = ({ children }: Props) => (
  <AntLayout style={{ minHeight: '100vh' }}>
    <Header />
    <Content>{children}</Content>
    <Footer />
    <SideMenu />
  </AntLayout>
);

export default connect(mapStateToProps)(Layout);
