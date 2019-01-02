// @flow
import React from 'react';
import { connect } from 'react-redux';

import { withI18next } from '../lib/withI18next';
import SEOHead from '../app/shared/seo/SEOHead';
import Container from '../app/components/Container';
import { i18nextNamespaces } from '../app/utils';
import { Link } from '../config/routes';

type Props = {
  t: any,
  i18n: any,
  currentRoute: any,
};

type State = {
  hasError: boolean,
};

const mapStateToProps = state => ({
  currentRoute: state.global.data.currentRoute,
});

@withI18next(i18nextNamespaces)
@connect(mapStateToProps)
class Error extends React.Component<Props, State> {
  static async getInitialProps({ res, err }: any) {
    if (res) {
      return { statusCode: res.statusCode };
    }
    if (err) {
      return { statusCode: err.statusCode };
    }

    return { statusCode: 500 };
  }

  render() {
    const { t, i18n, currentRoute } = this.props;
    // let { statusCode } = this.props;
    // const { hasError } = this.state;

    // Check for /500
    // if (currentRoute && currentRoute.parsedUrl.path.endsWith('/500')) {
    //   statusCode = '500';
    // }

    const helpLinks = t('error:links', { returnObjects: true });

    return (
      <div className="error-page-container">
        <SEOHead
          title={t('error:seo.title')}
          description={t('error:seo.description')}
          currentLocale={i18n.language}
          currentUrl={currentRoute ? currentRoute.parsedUrl.path : ''}
          noIndexPage
        />
        <Container>
          <section className="error ant-section">
            <h1>{t('error:lost')}</h1>
            <div className="error-code">
              {/* {statusCode >= 500 || hasError ? <div>{statusCode}</div> : <div>{statusCode}</div>} */}
              404
            </div>
            <div className="error-link-section">
              <h3>{t('error:help_links')}</h3>
              <ul>
                {Array.isArray(helpLinks)
                  && helpLinks.map(link => (
                    <li key={link.title}>
                      <Link route={link.route}>
                        <a>{link.title}</a>
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        </Container>
      </div>
    );
  }
}

export default Error;
