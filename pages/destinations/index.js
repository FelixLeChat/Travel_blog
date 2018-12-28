// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { I18nProps } from 'react-i18next';

// import { fetchDestinationDetailsStart } from '../../app/reducers/destination';
import { withI18next } from '../../lib/withI18next';
import SEOHead from '../../app/shared/seo/SEOHead';
import { i18nextNamespaces } from '../../app/utils';

import DestinationsIndex from '../../app/destinations/DestinationsIndex';

type Props = {
  i18n: I18nProps,
  currentRoute: Object,
};

const mapStateToProps = state => ({
  currentRoute: state.global.data.currentRoute,
});

@withI18next(i18nextNamespaces)
@connect(mapStateToProps)
class Index extends React.Component<Props> {
  // static async getInitialProps({ store, query }: any) {
  //   await store.dispatch(fetchDestinationDetailsStart({ params: query }));
  //   return {};
  // }

  render() {
    const { i18n, currentRoute } = this.props;

    return (
      <>
        <SEOHead
          title=""
          description=""
          currentLocale={i18n.language}
          currentUrl={currentRoute ? currentRoute.parsedUrl.path : ''}
        />
        <DestinationsIndex />
      </>
    );
  }
}

export default Index;
