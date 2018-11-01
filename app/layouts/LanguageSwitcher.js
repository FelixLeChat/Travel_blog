// @flow
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNamespaces } from 'react-i18next';
import { withRouter } from 'next/router';

import type { I18nProps } from 'react-i18next';
import type { GlobalStore } from '../models/global';

import Routes, { Router } from '../../config/routes';

type Props = {
  i18n: I18nProps,
  router: any,
};

@withRouter
class LanguageSwitcher extends React.PureComponent<Props> {
  handleLocaleSwitch = (languageKey) => {
    const {
      router: { asPath },
      i18n,
    } = this.props;
    const url = Routes.match(asPath);

    i18n.changeLanguage(languageKey, () => {
      Router.pushRoute(url.route.name, {
        locale: languageKey,
      });
    });
  };

  render() {
    const { i18n } = this.props;
    const locale = i18n.language;
    return (
      <div className="language-switcher">
        <a
          className={`button-locale ${locale === 'en' ? 'active' : ''}`}
          onClick={() => this.handleLocaleSwitch('en')}
          onKeyDown={() => {}}
        >
          EN
        </a>
        <a
          className={`button-locale ${locale === 'fr' ? 'active' : ''}`}
          onClick={() => this.handleLocaleSwitch('fr')}
          onKeyDown={() => {}}
        >
          FR
        </a>
      </div>
    );
  }
}

export default compose(withNamespaces(['header']))(LanguageSwitcher);
