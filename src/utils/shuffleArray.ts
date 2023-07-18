const shuffleArray = (original_array: any[]) => {
  const array = original_array.slice();
  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
};

export default shuffleArray;
