import React from 'react';
import App, { Container } from 'next/app';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import { setMobileMenuOpenedState } from '../app/reducers/ui';
import configureStore from '../app/store';
import initialI18nInstance from '../lib/i18n';
import Routes, { Router } from '../config/routes';
import { setCurrentRoute, fetchDestinationsStart, fetchThemesStart } from '../app/reducers/global';
import { initGA, logPageView } from '../app/utils/analytics';
import ErrorPage from './_error';

import '../app/assets/stylesheets/styles.less';

import ApplicationLayout from '../app/layouts/application/Layout';

class _App extends App {
  state = {
    gaInitialized: false,
  };

  static async getInitialProps({ Component, ctx }) {
    const route = Routes.match(ctx.asPath);
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
      if (route) {
        ctx.store.dispatch(setCurrentRoute(route));
      }
    }

    await ctx.store.dispatch(fetchDestinationsStart());
    await ctx.store.dispatch(fetchThemesStart());

    return { pageProps };
  }

  componentDidMount() {
    const { gaInitialized } = this.state;

    Router.router.events.on('routeChangeComplete', logPageView);
    Router.router.events.on('routeChangeStart', () => {
      this.props.store.dispatch(setMobileMenuOpenedState(false));
    });
    Router.events.on('routeChangeComplete', () => {
      // Scroll to top
      window.scrollTo(0, 0);
    });
    // Intercept back and next browser button event to force a SSR.
    Router.beforePopState(({ as }) => {
      // If route is unrecognized by the router, that's a 404
      if (!Routes.match(as).route) {
        // Have SSR render bad routes as a 404.
        window.location.href = as;
        return false;
      }
      return true;
    });

    if (typeof window !== 'undefined') {
      // Google Analytics
      if (!gaInitialized) {
        initGA();
        logPageView();
        this.setState({ gaInitialized: true });
      }
    }
  }

  componentDidCatch() {}

  render() {
    const { Component, pageProps, store } = this.props;
    const { i18n, initialI18nStore, initialLanguage } = pageProps || {};

    const component = pageProps.statusCode ? (
      <ErrorPage {...pageProps} statusCode={pageProps.statusCode} />
    ) : (
      <Component {...pageProps} />
    );

    const Layout = ApplicationLayout;

    return (
      <Container>
        <I18nextProvider
          i18n={i18n || initialI18nInstance}
          initialI18nStore={initialI18nStore}
          initialLanguage={initialLanguage}
        >
          <React.Fragment>
            <Provider store={store}>
              <Layout>{component}</Layout>
            </Provider>
          </React.Fragment>
        </I18nextProvider>
      </Container>
    );
  }
}

export default withRedux(configureStore)(withReduxSaga({ async: true })(_App));
