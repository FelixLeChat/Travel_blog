// @flow
import React from 'react';
import { withRouter } from 'next/router';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import {
  Layout, Row, Col, Menu,
} from 'antd';
import Sticky from 'react-stickynode';

import Container from '../../components/Container';
import LanguageSwitcher from '../LanguageSwitcher';

const AntHeader = Layout.Header;

const mapStateToProps = state => ({
  global: state.global,
});

@withNamespaces(['header'])
@withRouter
@connect(mapStateToProps)
class Header extends React.PureComponent<Props> {
  render() {
    const { t } = this.props;
    return (
      <Sticky enabled>
        <AntHeader className="header">
          <Container>
            <Row className="ant-visible@s">
              <Col span={4} />
              <Col span={16} className="ant-text-center">
                <Menu mode="horizontal">
                  <Menu.Item key="1">{t('header:navigation.home')}</Menu.Item>
                </Menu>
              </Col>
              <Col span={4} className="ant-text-right">
                <div className="header-language-switch">
                  <LanguageSwitcher />
                </div>
              </Col>
            </Row>
            <Row className="ant-hidden@s">MOBILE</Row>
          </Container>
        </AntHeader>
      </Sticky>
    );
  }
}

export default Header;
