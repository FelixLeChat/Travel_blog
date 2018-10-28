// @flow
import React from 'react';
import { withRouter } from 'next/router';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Layout, Row, Col } from 'antd';

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
    return (
      <AntHeader className="header">
        <Container>
          <Row>
            <Col span={16} />
            <Col span={8} className="ant-text-right ie-header-section-fix">
              <LanguageSwitcher />
            </Col>
          </Row>
        </Container>
      </AntHeader>
    );
  }
}

export default Header;
