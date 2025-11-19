// Test yang sengaja gagal untuk screenshot CI error
describe('Failing Tests for CI Error Screenshot', () => {
  test('should fail - true is not false', () => {
    expect(true).toBe(false);
  });

  test('should fail - math error', () => {
    expect(2 + 2).toBe(5);
  });

  test('should fail - undefined property', () => {
    const obj = undefined;
    expect(obj.someProperty).toBeDefined();
  });
});