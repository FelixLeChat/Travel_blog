// @flow
import React from 'react';
import { withNamespaces } from 'react-i18next';

import Container from '../components/Container';

type Props = {
  t: TFunction,
};

@withNamespaces(['home'])
class Home extends React.Component<Props> {
  render() {
    const { t } = this.props;

    return (
      <div className="home">
        <div className="home-brand">{t('home:brand')}</div>
        <div className="home-hero" />
        <Container>TEST</Container>
      </div>
    );
  }
}

export default Home;
