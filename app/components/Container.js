// @flow
import * as React from 'react';

const sizes = { small: 'small', normal: 'normal', large: 'large' };

type Size = $Keys<typeof sizes>;

type Props = {
  children: React.Node,
  size?: Size,
};

const Container = ({ children, size }: Props) => {
  let className;

  switch (size) {
    case sizes.large:
      className = 'ant-container-large';
      break;

    default:
      className = 'ant-container';
      break;
  }

  return <div className={className}>{children}</div>;
};

Container.defaultProps = {
  size: sizes.normal,
};

export default Container;
