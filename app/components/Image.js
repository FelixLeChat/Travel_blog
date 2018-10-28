// @flow
import React from 'react';

type Props = {
  src: string,
  alt: string,
  className: string,
  // The possible values are 'lg', 'md' and 'sm'
  adjustMargin: string,
};

export default class Image extends React.PureComponent<Props> {
  render() {
    const {
      src,
      alt,
      className,
      adjustMargin,
    } = this.props;
    return (
      <div className={`${className || ''} ${adjustMargin ? `screen-adjust-margin-${adjustMargin}` : ''}`}>
        <picture>
          <source
            srcSet={`${src}.png 1x, ${src}@2x.png 2x, ${src}@3x.png 3x`}
            type="image/png"
            alt={alt}
          />
          <img
            src={`${src}.png`}
            type="image/png"
            alt={alt}
          />
        </picture>
      </div>
    );
  }
}
