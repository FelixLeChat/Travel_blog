// @flow
import React from 'react';
import { withRouter } from 'next/router';
import { Layout } from 'antd';

import Container from '../../components/Container';

type Props = {};

@withRouter
class Footer extends React.PureComponent<Props> {
  render() {
    return (
      <Layout.Footer className="footer">
        <Container />
      </Layout.Footer>
    );
  }
}

export default Footer;
