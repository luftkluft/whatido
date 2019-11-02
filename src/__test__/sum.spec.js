import sum from '../helpers/sum';

describe(`Sum's helper test`, () => {
  it('arguments 1 + 2 = 3', () => {
    expect(sum(1, 2)).toBe(3);
  })
})
