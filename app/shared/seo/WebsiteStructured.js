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
      url: `https://chronometriq.com/${language}`,
      potentialAction: {
        '@type': 'SearchAction',
        target: `https://chronometriq.com/${language}/search?query={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    return <JsonLd data={orgData} />;
  }
}

export default WebsiteStructured;
