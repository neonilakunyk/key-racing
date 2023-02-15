const randomInteger = (min: number, max: number): number => {
  // min and max included
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

export { randomInteger };
