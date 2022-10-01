import React, { FC } from 'react';
import { HeadFieldsArguments } from './index';

type PropsForSelectOfHeadTable = {
  set: React.Dispatch<React.SetStateAction<HeadFieldsArguments>>,
  HEAD_FIELDS: HeadFieldsArguments[],
}

const SelectOfHeadTable: FC<PropsForSelectOfHeadTable> = ({ HEAD_FIELDS, set }) => (
  <select
    style={{ margin: '0 10px 0 0' }}
    onChange={(e) => {
      set(HEAD_FIELDS.filter((item) => item.name === e.target.value)[0]);
    }}
  >
    {HEAD_FIELDS.map(({ name }) => (
      <option value={name}>{name}</option>
    ))}
  </select>
);

type PropsForSelectOfCondition = {
  selectedHeaderField: HeadFieldsArguments,
  set: React.Dispatch<React.SetStateAction<string>>
}

const SelectOfCondition: FC<PropsForSelectOfCondition> = ({ selectedHeaderField, set }) => (
  <select
    style={{ margin: '0 10px 10px 0' }}
    onChange={(e) => set(e.target.value)}
  >
    {selectedHeaderField.conditions.map((condition) => (
      <option value={condition}>{condition}</option>
    ))}
  </select>
);

export { SelectOfHeadTable, SelectOfCondition };
