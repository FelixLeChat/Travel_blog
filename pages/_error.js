// @flow
import React from 'react';
import { connect } from 'react-redux';

import { withI18next } from '../lib/withI18next';
import SEOHead from '../app/shared/seo/SEOHead';
import Container from '../app/components/Container';
import { i18nextNamespaces } from '../app/utils';

type Props = {
  t: any,
  i18n: any,
  currentRoute: any,
  statusCode: number,
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
  state = {
    hasError: false,
  };

  static async getInitialProps({ res, err }: any) {
    if (res) {
      return { statusCode: res.statusCode };
    }
    if (err) {
      return { statusCode: err.statusCode };
    }

    return { statusCode: 500 };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { t, i18n, currentRoute } = this.props;
    let { statusCode } = this.props;
    const { hasError } = this.state;

    // Check for /500
    if (currentRoute && currentRoute.parsedUrl.path.endsWith('/500')) {
      statusCode = '500';
    }

    return (
      <>
        <SEOHead
          title={t('error:seo.title')}
          description={t('error:seo.description')}
          currentLocale={i18n.language}
          currentUrl={currentRoute ? currentRoute.parsedUrl.path : ''}
          noIndexPage
        />
        <Container>
          <section className="error ant-section">
            {/* Message for 404 page */}
            {statusCode >= 500 || hasError ? <div>{statusCode}</div> : <div>{statusCode}</div>}
          </section>
        </Container>
      </>
    );
  }
}

export default Error;
