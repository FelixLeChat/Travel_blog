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

const cont = {
  backgroundColor: '#eee',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
};

const PolaroidStyleImage = ({
  index, onClick, photo, margin, direction, top, left,
}: Props) => {
  if (direction === 'column') {
    cont.position = 'absolute';
    cont.left = left;
    cont.top = top;
  }

  return (
    <div
      style={{
        margin,
        height: photo.height + 35,
        width: photo.width,
        ...cont,
      }}
      className={classnames(!photo.selected ? 'not-selected' : '', 'polaroid-style-image')}
    >
      <img
        {...photo}
        onClick={e => onClick(e, { index, photo })}
        onKeyDown={() => {}}
        alt="Gallery"
      />
    </div>
  );
};

export default PolaroidStyleImage;
