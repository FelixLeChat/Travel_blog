/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// @flow
import React from 'react';
import classnames from 'classnames';

type Props = {
  index: number,
  onClick: () => {},
  photo: any,
  margin: any,
  direction: any,
  top: any,
  left: any,
};

const RegularStyleImage = ({
  index, onClick, photo, margin,
}: Props) => (
  <div
    style={{
      margin,
      height: photo.height,
      width: photo.width,
      cursor: 'pointer',
    }}
    className={classnames(!photo.selected ? 'not-selected' : '', 'regular-style-image')}
  >
    <img
      {...photo}
      onClick={e => onClick(e, { index, photo })}
      onKeyDown={() => {}}
      alt="Gallery"
    />
  </div>
);

export default RegularStyleImage;
