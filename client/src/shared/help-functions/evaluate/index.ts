const evaluate = (a: number | string, b: number | string, operation: string) => {
  switch (operation) {
    case "=":
      return a == b;
    case "<":
      return a < b;
    case ">":
      return a > b;
  }
};

export default evaluate;
