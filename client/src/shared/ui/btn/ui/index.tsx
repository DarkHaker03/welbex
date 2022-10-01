import React, { FC } from 'react';

type Props = {
  onClick: any,
  text: string
}

const Btn: FC<Props> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    type="button"
  >
    {text}
  </button>
);

export default Btn;
