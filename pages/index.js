// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { I18nProps } from 'react-i18next';

import { withI18next } from '../lib/withI18next';
import SEOHead from '../app/shared/seo/SEOHead';
import { i18nextNamespaces } from '../app/utils';
import { fetchHomeStart } from '../app/reducers/home';

import Home from '../app/home/Home';

const i18nPrefix = 'pages/home';

type Props = {
  t: TFunction,
  i18n: I18nProps,
  currentRoute: Object,
};

const mapStateToProps = state => ({
  currentRoute: state.global.data.currentRoute,
});

@withI18next(i18nextNamespaces)
@connect(mapStateToProps)
class Homepage extends React.Component<Props> {
  static async getInitialProps({ store }: any) {
    await store.dispatch(fetchHomeStart());
    return {};
  }

  render() {
    const { i18n, t, currentRoute } = this.props;

    return (
      <>
        <SEOHead
          title={t(`${i18nPrefix}:seo.title`)}
          description={t(`${i18nPrefix}:seo.description`)}
          currentLocale={i18n.language}
          currentUrl={currentRoute ? currentRoute.parsedUrl.path : ''}
        />
        <Home />
      </>
    );
  }
}

export default Homepage;
