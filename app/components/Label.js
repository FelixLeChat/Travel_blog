// @flow
import * as React from 'react';

type Props = {
  children: React.Node,
  className: any,
};

const Badge = (props: Props) => <span className={`ant-label ${props.className ? props.className : ''}`}>{props.children}</span>;

export default Badge;
