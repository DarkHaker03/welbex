import { useUnit } from 'effector-react';
import { FC } from 'react';
import { $fromStart, $selected, clickOnNumberBrns } from '../../model';
import styles from './styles.module.scss';

type Props = {
  quantityOfBtns: number,
  counterOfslides: number
}

const NumberBtns: FC<Props> = ({ quantityOfBtns, counterOfslides }) => {
  const [selected, fromStart] = useUnit([$selected, $fromStart]);
  const arrayOfQuantityBtns = [...Array(quantityOfBtns)];

  return (
    <div style={{ display: 'flex' }}>
      {arrayOfQuantityBtns.map((i, idx) => {
        const current = idx + 1;
        const isSelected = selected === (current);
        return (
          <button
            onClick={() => clickOnNumberBrns({ current, counterOfslides })}
            className={isSelected ? styles.selected : ''}
            type="button"
          >
            {current + fromStart}
          </button>
        );
      })}
    </div>
  );
};

export default NumberBtns;
