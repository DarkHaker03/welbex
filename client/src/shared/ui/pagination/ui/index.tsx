import { FC } from 'react';
import { DataArguments } from '../../../../app';
import { Btn } from '../../btn';
import {
  handleClick2,
  handleClick3,
  setCurrentPage,
  setFromStart,
  setSelected,
} from '../model';
import NumberBtns from './numberBtns';
import styles from './styles.module.scss';

type Props = {
  data: DataArguments[],
}

const Pagination: FC<Props> = ({ data }) => {
  let quantityOfBtns: number = 5;
  const counterOfslides = Math.ceil(data.length / 10);
  const isQuiantityMoreThenSlides = quantityOfBtns > counterOfslides;
  if (isQuiantityMoreThenSlides) {
    quantityOfBtns = counterOfslides;
  }
  return (
    <div className={styles.pagination}>
      <div>
        <Btn
          onClick={() => {
            setCurrentPage(1);
            setSelected(1);
            setFromStart(0);
          }}
          text="<<"
        />
        <Btn
          onClick={() => {
            handleClick2();
          }}
          text="<"
        />
      </div>
      <NumberBtns counterOfslides={counterOfslides} quantityOfBtns={quantityOfBtns} />
      <div>
        <Btn
          onClick={() => {
            handleClick3({ quantityOfBtns, counterOfslides });
          }}
          text=">"
        />
        <Btn
          onClick={() => {
            setCurrentPage(counterOfslides);
            setSelected(quantityOfBtns);
            setFromStart(counterOfslides - quantityOfBtns);
          }}
          text=">>"
        />
      </div>
    </div>
  );
};

export default Pagination;
