import { sayHello, sum } from "./main";

describe("the say hello function", () => {
  it("sayHello function exists", () => {
    expect(sayHello).toBeDefined();
  });
});

describe("the sum function", () => {
  const sut = sum;
  it("should sum numbers", () => {
    const actual = sut(1, 2);
    const expected = 3;
    expect(actual).toBe(expected);
  });
});
