// @flow
import React from 'react';
import { withRouter } from 'next/router';
import { Layout, Row, Col } from 'antd';
import { withNamespaces } from 'react-i18next';

import Container from '../../components/Container';
import { Link } from '../../../config/routes';

const i18nPrefix = 'navigation/footer';

type Props = {
  t: TFunction,
};

@withNamespaces([i18nPrefix])
@withRouter
class Footer extends React.PureComponent<Props> {
  render() {
    const { t } = this.props;

    return (
      <Layout.Footer>
        <div className="footer ant-padding-large-top ant-padding-large-bottom">
          <Container>
            <Row type="flex" justify="space-around" align="middle">
              {/* Tablet Up */}
              <Col span={0} md={8} className="ant-text-left">
                {t(`${i18nPrefix}:copyright`)}
              </Col>
              <Col span={0} md={8} className="ant-text-center">
                <Link route="index">
                  <a>
                    <img
                      src="/static/images/logo/logo_3.png"
                      width="45px"
                      height="45px"
                      alt="Traveling Maude Logo"
                    />
                  </a>
                </Link>
              </Col>
              <Col span={0} md={8} className="ant-text-right">
                {t(`${i18nPrefix}:made_in_montreal`)}
              </Col>

              {/* Mobile only */}

              <Col span={24} md={0} className="ant-text-center">
                <Link route="index">
                  <a>
                    <img
                      src="/static/images/logo/logo_3.png"
                      width="45px"
                      height="45px"
                      alt="Traveling Maude Logo"
                    />
                  </a>
                </Link>
              </Col>
              <Col span={24} md={0} className="ant-text-center ant-margin-large-top">
                {t(`${i18nPrefix}:made_in_montreal`)}
              </Col>
              <Col span={24} md={0} className="ant-text-center ant-margin-top">
                {t(`${i18nPrefix}:copyright`)}
              </Col>
            </Row>
          </Container>
        </div>
        <div className="subfooter">
          <Container>
            <Row>
              <Col span={24} className="ant-text-center">
                <Link route="privacy">
                  <a>Privacy Policy</a>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </Layout.Footer>
    );
  }
}

export default Footer;
