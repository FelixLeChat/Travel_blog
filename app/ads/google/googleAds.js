// @flow
import React from 'react';

type Props = {
  className?: string,
  style?: {},
  client: string,
  slot: string,
  layout?: string,
  format?: string,
  responsive?: string,
};

export default class GoogleAds extends React.Component<Props> {
  static defaultProps = {
    className: '',
    style: { display: 'block' },
    format: 'auto',
    layout: '',
    responsive: 'false',
  };

  componentDidMount() {
    if (window) (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render() {
    return (
      <ins
        className={`${this.props.className} adsbygoogle`}
        style={this.props.style}
        data-ad-client={this.props.client}
        data-ad-slot={this.props.slot}
        data-ad-layout={this.props.layout}
        data-ad-format={this.props.format}
        data-full-width-responsive={this.props.responsive}
      />
    );
  }
}
