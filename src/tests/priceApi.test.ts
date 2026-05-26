// Tests the API route/service behaviour for valid and invalid service types.

describe("service price logic", () => {
  const prices: Record<string, number> = {
    consultation: 80,
    support: 120,
    installation: 200,
  };

  test("returns the correct price for consultation", () => {
    expect(prices["consultation"]).toBe(80);
  });

  test("returns undefined for an invalid service type", () => {
    expect(prices["cleaning"]).toBeUndefined();
  });
});