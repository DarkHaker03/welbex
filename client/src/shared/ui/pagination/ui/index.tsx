import React, { FC, useEffect, useState } from 'react';
import { DataArguments } from '../../../../app';
import { Btn } from '../../btn';
import styles from './styles.module.scss';

type Props = {
  data: DataArguments[],
  currentPage: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

const Pagination: FC<Props> = ({ data, currentPage, setCurrentPage }) => {
  const [selected, setSelected] = useState<number>(1);
  const [fromStart, setFromStart] = useState<number>(0);
  let quantityOfBtns: number = 5;
  const counterOfslides = Math.ceil(data.length / 10);
  const isQuiantityMoreThenSlides = quantityOfBtns > counterOfslides;
  if (isQuiantityMoreThenSlides) {
    quantityOfBtns = counterOfslides;
  }
  const handleClick = (current: number) => {
    return () => {
      if (fromStart > 0) {
        if (
          currentPage === (counterOfslides - 3)
        ) {
          console.log('a');
          if (current === 4) {
            setSelected(3);
            setFromStart(fromStart + 1);
          } else if (current === 5) {
            setSelected(4);
            setFromStart(fromStart + 1);
          } else if (current < 3) {
            setSelected(3);
            setFromStart(fromStart + (current - 3));
          }
        } else if ((current + fromStart) >= (counterOfslides - 2)) {
          if (current > 3) {
            console.log('b');
            setSelected(current);
          } else {
            setSelected(current);
            setFromStart(fromStart + (current - 3));
          }
        } else {
          const newFromStart = fromStart + (current - 3);
          if (newFromStart > 0) {
            setSelected(3);
            setFromStart(newFromStart);
          } else {
            setSelected(current + fromStart);
            setFromStart(0);
          }
        }
      } else if (current >= 3) {
        setSelected(3);
        setFromStart(current - 3);
      } else {
        setSelected(current);
      }
      setCurrentPage(current + fromStart);
    };
  };
  const arrayOfQuantityBtns = [...Array(quantityOfBtns)];
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
            if ((selected !== 1 && currentPage <= 3) || selected === 5 || selected === 4) {
              setSelected(selected - 1);
            } else if (fromStart !== 0) {
              setFromStart(fromStart - 1);
            }
            if (currentPage !== 1) {
              setCurrentPage(currentPage - 1);
            }
          }}
          text="<"
        />
      </div>
      <div style={{ display: 'flex' }}>
        {arrayOfQuantityBtns.map((i, idx) => {
          const current = idx + 1;
          const isSelected = selected === (current);
          return (
            <button
              onClick={handleClick(current)}
              className={isSelected ? styles.selected : ''}
              type="button"
            >
              {current + fromStart}
            </button>
          );
        })}
      </div>
      <div>
        <Btn
          onClick={() => {
            if (selected < (quantityOfBtns - 2)) {
              setSelected(selected + 1);
            } else if (fromStart !== counterOfslides - quantityOfBtns) {
              setFromStart(fromStart + 1);
            }
            if (currentPage !== counterOfslides) {
              setCurrentPage(currentPage + 1);
            }
            if (selected !== 5 && currentPage >= counterOfslides - 2) {
              setSelected(selected + 1);
            }
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
