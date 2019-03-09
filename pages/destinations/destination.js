// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { I18nProps } from 'react-i18next';

import { fetchDestinationDetailsStart } from '../../app/reducers/destination';
import { withI18next } from '../../lib/withI18next';
import SEOHead from '../../app/shared/seo/SEOHead';
import { i18nextNamespaces } from '../../app/utils';
import DestinationBreadcrumb from '../../app/shared/seo/DestinationBreadcrumb';
import Destination from '../../app/destinations/Destination';

const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  i18n: I18nProps,
  currentRoute: Object,
  destination: DestinationStore,
};

const mapStateToProps = state => ({
  currentRoute: state.global.data.currentRoute,
  destination: state.destination,
});

@withI18next(i18nextNamespaces)
@connect(mapStateToProps)
class Destinations extends React.Component<Props> {
  static async getInitialProps({ store, query }: any) {
    await store.dispatch(fetchDestinationDetailsStart({ params: query }));
    return {};
  }

  render() {
    const {
      t,
      i18n,
      currentRoute,
      destination: {
        data: { destination, description },
      },
    } = this.props;

    return (
      <>
        <SEOHead
          title={`Destination : ${t(
            `${i18nCommonPrefix}:destinations.${destination}`,
          )} | Traveling Maude`}
          description={
            description
              ? `${description} ${t(`${i18nCommonPrefix}:description`)}`
              : t(`${i18nCommonPrefix}:description`)
          }
          currentLocale={i18n.language}
          currentUrl={currentRoute ? currentRoute.parsedUrl.path : ''}
        />
        <Destination />
        <DestinationBreadcrumb destination={destination} />
      </>
    );
  }
}

export default Destinations;
