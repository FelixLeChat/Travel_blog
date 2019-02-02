// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import classnames from 'classnames';

const i18nCommonPrefix = 'common';

type Props = {
  t: TFunction,
  ads: any,
  className: string,
};

@withNamespaces([i18nCommonPrefix])
class AdsSider extends React.Component<Props> {
  render() {
    const { t, ads, className } = this.props;

    if (ads) {
      return (
        <div className={classnames('ad-menu-container ant-margin-left', className)}>
          <h3 className="border-bottom-box">
            <FontAwesomeIcon icon={faHandshake} />
            {t(`${i18nCommonPrefix}:partner`)}
          </h3>
          {ads}
        </div>
      );
    }
    return null;
  }
}

export default AdsSider;
