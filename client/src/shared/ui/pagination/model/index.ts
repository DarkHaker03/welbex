import { createEffect, createEvent, restore } from 'effector';

export const setSelected = createEvent<number>();
export const setFromStart = createEvent<number>();
export const setCurrentPage = createEvent<number>();

export const $selected = restore<number>(setSelected, 1);
export const $fromStart = restore<number>(setFromStart, 0);
export const $currentPage = restore<number>(setCurrentPage, 1);

export const clickOnNumberBrns = createEffect((
  { current, counterOfslides }: { current: number, counterOfslides: number },
) => {
  const currentPage = $currentPage.getState();
  const fromStart = $fromStart.getState();

  if (fromStart > 0) {
    if (
      currentPage === (counterOfslides - 3)
    ) {
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
});

export const back = createEffect(() => {
  const selected = $selected.getState();
  const currentPage = $currentPage.getState();
  const fromStart = $fromStart.getState();

  if ((selected !== 1 && currentPage <= 3) || selected === 5 || selected === 4) {
    setSelected(selected - 1);
  } else if (fromStart !== 0) {
    setFromStart(fromStart - 1);
  }
  if (currentPage !== 1) {
    setCurrentPage(currentPage - 1);
  }
});

export const next = createEffect((
  { quantityOfBtns, counterOfslides }: { quantityOfBtns: number, counterOfslides: number },
) => {
  const selected = $selected.getState();
  const currentPage = $currentPage.getState();
  const fromStart = $fromStart.getState();

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
});
