// @flow
import React from 'react';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';

import type { DestinationStore } from '../models/destination';
import { Link } from '../../config/routes';

const i18nPrefix = 'pages/destination';

type Props = {
  t: TFunction,
  i18n: I18nProps,
  destination: DestinationStore,
};

const mapStateToProps = state => ({
  destination: state.destination,
});

@withNamespaces([i18nPrefix])
@connect(mapStateToProps)
class Destination extends React.Component<Props> {
  render() {
    const {
      t,
      i18n,
      destination: {
        data: { destination, hero },
      },
    } = this.props;
    const locale = i18n.language;

    return (
      <div className="destination">
        {hero && (
          <div className="destination-hero" style={{ backgroundImage: `url(${hero})` }}>
            <div className="ext-box ant-text-center" style={{ height: '100%' }}>
              <div className="int-box">
                <h1>{t(`${i18nPrefix}:hero.${destination}.title`)}</h1>
                <div className="breadcrumb">
                  <Link route="index" params={{ locale }}>
                    <a>{t(`${i18nPrefix}:beadcrumb.home`)}</a>
                  </Link>
                  <span> / </span>
                  <a>{t(`${i18nPrefix}:beadcrumb.destinations`)}</a>
                  <span> / </span>
                  <Link route="destination-details" params={{ locale, destination }}>
                    <a>{t(`${i18nPrefix}:hero.${destination}.title`)}</a>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="ext-box ant-text-center hero-text-background"
              style={{ height: '100%' }}
            >
              <div className="int-box">
                <h2>{t(`${i18nPrefix}:hero.${destination}.title`)}</h2>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Destination;
