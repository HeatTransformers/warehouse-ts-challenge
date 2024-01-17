import { exampleFunction } from "./example";

describe(exampleFunction.name, () => {
  it('returns correct value', () => {
    expect(exampleFunction()).toBe(123);
  });
});
