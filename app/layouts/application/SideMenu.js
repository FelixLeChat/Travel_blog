// @flow
import React from 'react';
import { withRouter } from 'next/router';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Link } from '../../../config/routes';

const { Sider } = Layout;

const mapStateToProps = state => ({
  global: state.global,
});

type Props = {
  t: TFunction,
  i18n: I18nProps,
};

@withNamespaces(['side_menu'])
@withRouter
@connect(mapStateToProps)
class Header extends React.PureComponent<Props> {
  render() {
    const { i18n, t } = this.props;
    const locale = i18n.language;
    const siderLinks = t('side_menu:menu.links', { returnObjects: true });

    return (
      <Sider
        className="sider-menu"
        width="220"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="sider-container">
          <div className="sider-main-logo">
            <Link route="index" params={{ locale }}>
              <a>
                <img
                  src="/static/images/logo/logo_horizontal_2.png"
                  alt={t('side_menu:logo.alt')}
                />
              </a>
            </Link>
          </div>

          <div className="sider-links">
            <ul>
              {Array.isArray(siderLinks)
                && siderLinks.map(link => (
                  <li key={link.label}>
                    <Link route={link.route} params={{ locale }}>
                      <a>{link.label}</a>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Sider>
    );
  }
}

export default Header;
