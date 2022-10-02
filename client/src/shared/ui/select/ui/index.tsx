import { FC } from 'react';

type Props = {
  onChange: any,
  data: any,
}

const Select: FC<Props> = ({ data, onChange }) => (
  <select
    style={{ margin: '0 10px 0 0' }}
    onChange={onChange}
  >
    {data.map((value: any) => (
      <option value={value}>{value}</option>
    ))}
  </select>
);

export default Select;
