import { FC } from "react";
import { DataArguments } from './index';

type Props = {
  filteredData: DataArguments[]
}

const Tbody: FC<Props> = ({ filteredData }) => (
  <tbody>
    {filteredData.map(({ name, quantity, distance, date }, idx) => {
      const formatedDate: string = new Date(date).toISOString().substr(0, 10);
      return (
        <tr key={idx}>
          <td>{name}</td>
          <td>{formatedDate}</td>
          <td>{quantity}</td>
          <td>{distance}</td>
        </tr>
      )
    })}
  </tbody>
);

export default Tbody;
