// @flow
import * as React from 'react';

const sizes = { small: 'small', normal: 'normal', large: 'large' };

type Size = $Keys<typeof sizes>;

type Props = {
  children: React.Node,
  size?: Size,
  className?: string,
};

const Container = ({ children, size, className }: Props) => {
  let newClassName = className;

  switch (size) {
    case sizes.large:
      newClassName = `ant-container-large ${className}`;
      break;

    default:
      newClassName = `ant-container ${className}`;
      break;
  }

  return <div className={newClassName}>{children}</div>;
};

Container.defaultProps = {
  size: sizes.normal,
  className: '',
};

export default Container;
