// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-regular-svg-icons';

import type { GlobalStore } from '../../models/global';
import { groupBy } from '../../utils/utils';
import { Link } from '../../../config/routes';

const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  global: GlobalStore,
};

const mapStateToProps = state => ({
  global: state.global,
});

@withNamespaces([i18nCommonPrefix])
@connect(mapStateToProps)
class DestinationSider extends React.Component<Props> {
  render() {
    const {
      t,
      global: {
        data: { destinations },
      },
    } = this.props;

    let groupedDestinations = {};
    if (destinations) {
      groupedDestinations = groupBy(destinations, 'continent');
    }
    return (
      <div className="destinations-menu-container ant-margin-left">
        {Object.keys(groupedDestinations).map(key => (
          <div key={key}>
            <h3 className="border-bottom-box">
              <FontAwesomeIcon icon={faMap} />
              {t(`${i18nCommonPrefix}:continents.${key}`)}
            </h3>
            <ul>
              {groupedDestinations[key].sort().map(destination => (
                <li key={destination.name}>
                  <Link route="destination-details" params={{ destination: destination.name }}>
                    <a style={{ display: 'block' }}>
                      <div className="destination-with-image">
                        {destination.thumbnail && (
                          <img
                            src={destination.thumbnail}
                            alt={`Thumbnail of ${destination.name}`}
                          />
                        )}
                        <div className="destination-name ext-box">
                          <div className="int-box">
                            {t(`${i18nCommonPrefix}:destinations.${destination.name}`)}
                          </div>
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default DestinationSider;
