import { FC } from 'react';
import { DataArguments } from './index';

type Props = {
  filteredData: DataArguments[],
  currentPage: number
}

const Tbody: FC<Props> = ({ filteredData, currentPage }) => (
  <tbody>
    {filteredData.map(({
      name, quantity, distance, date,
    }, idx) => {
      const formatedDate: string = new Date(date).toISOString().substr(0, 10);
      if (idx < (currentPage * 10) && idx > ((currentPage - 1) * 10)) {
        return (
          <tr>
            <td>{formatedDate}</td>
            <td>{name}</td>
            <td>{quantity}</td>
            <td>{distance}</td>
          </tr>
        );
      }
      return null;
    })}
  </tbody>
);

export default Tbody;
