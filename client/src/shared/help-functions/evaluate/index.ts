const evaluate = (a: number | string, b: number | string, operation: string) => {
  switch (operation) {
    case '=':
      return Number(a) === Number(b);
    case '<':
      return a < b;
    case '>':
      return a > b;
    default:
      console.error('unexpected operator');
      return false;
  }
};

export default evaluate;
