import {
  initializeBoardCards,
  initializeReadingCards,
} from '../../utils/cardList';

describe('initializeBoardCards', () => {
  test('返す配列の要素が50個あること', () => {
    expect(initializeBoardCards()).toHaveLength(50);
  });
});

describe('initializeReadingCards', () => {
  test('返す配列の要素が50個あること', () => {
    expect(initializeReadingCards()).toHaveLength(50);
  });
});
