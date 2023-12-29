import shuffleArray from '../../utils/shuffleArray';

test('渡した配列の要素と返す配列の要素が同じであること', () => {
  const array = Array.from(Array(100).keys());
  const result = shuffleArray(array);
  expect(result.sort()).toEqual(array.sort());
});
