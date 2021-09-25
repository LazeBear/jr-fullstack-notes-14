function sum(a, b) {
  return a + b;
}

describe('sum function', () => {
  // test()
  it('should return the correct sum of two numbers', () => {
    const result = sum(1, 2);
    expect(result).toBe(3);
  });
});

// basic.test.js, basic.spec.js
