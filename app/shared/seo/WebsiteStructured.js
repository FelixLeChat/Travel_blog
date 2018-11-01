// @flow
import React from 'react';
import JsonLd from './JsonLd';

type Props = {
  language: string,
};

class WebsiteStructured extends React.PureComponent<Props> {
  render() {
    const { language } = this.props;

    const orgData = {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: `https://travelingmaude.com/${language}`,
    };

    return <JsonLd data={orgData} />;
  }
}

export default WebsiteStructured;
