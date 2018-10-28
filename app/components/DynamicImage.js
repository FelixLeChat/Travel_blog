// @flow
import * as React from 'react';
import classNames from 'classnames';

const statusValues = {
  PENDING: 'pending',
  LOADING: 'loading',
  SUCCESS: 'success',
  FAILED: 'failed',
};
type Status = 'pending' | 'loading' | 'success' | 'failed';

type Props = {
  src: string,
  className: any,
  alt: string,
};

type State = {
  status: Status,
};

export default class DynamicImage extends React.Component<Props, State> {
  state = {
    status: statusValues.PENDING,
  };

  componentDidMount() {
    this.reload(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    // reload only when image src is changed.
    if (this.props.src !== nextProps.src) {
      this.reload(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.img) {
      this.img.onload = () => {};
      this.img.onerror = () => {};
      delete this.img;
    }
  }

  reload = (props: Props) => {
    this.img = new Image();
    this.img.onload = this.handleLoad;
    this.img.onerror = this.handleError;
    this.img.src = props.src;
  };

  // eslint-disable-next-line
  handleLoad = () => {
    this.setState({ status: statusValues.SUCCESS });
  };

  // eslint-disable-next-line
  handleError = () => {
    this.setState({ status: statusValues.FAILED });
  };

  img: Image;

  render() {
    const { src, className, alt } = this.props;
    const { status } = this.state;
    const dynamicImageClassName = classNames(
      `dynamic-image ${status === statusValues.SUCCESS ? '' : 'placeholder'} ${className}`,
    );
    return (
      <div className={dynamicImageClassName}>
        {status === statusValues.SUCCESS && <img src={src} alt={alt} />}
      </div>
    );
  }
}
