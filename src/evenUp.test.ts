import { buildTransactionMap, calculateDebts } from './evenUp';

describe('evenUp', () => {
  describe('calculateDebts()', () => {
    test('case 1', () => {
      const inputPayments = [60, 75, 20, 0];
      const expectedDebts = [-21.25, -36.25, 18.75, 38.75];

      expect(calculateDebts(inputPayments)).toEqual(expectedDebts);
    });
    test('case 2', () => {
      const inputPayments = [100, 72.5, 20, 7, 0];
      const expectedDebts = [-60.1, -32.6, 19.9, 32.9, 39.9];

      expect(calculateDebts(inputPayments)).toEqual(expectedDebts);
    });
  });

  describe('buildTransactionMap()', () => {
    it('should not allow uneven debts', () => {
      const inputDebts = [32, 12, -1];
      const friends = ['bailey', 'winston', 'jess'];

      expect(() => {
        buildTransactionMap(inputDebts, friends);
      }).toThrow('The sum of all debts must be zero');
    });
    test('case 1', () => {
      const inputDebts = [-21.25, -36.25, 18.75, 38.75];
      const friends = ['mitch', 'johnny', 'beth', 'randy'];

      const expectedTransactionMap = [
        'randy pays johnny $36.25',
        'randy pays mitch $2.50',
        'beth pays mitch $18.75',
      ];

      expect(buildTransactionMap(inputDebts, friends)).toEqual(
        expectedTransactionMap
      );
    });
    test('case 2', () => {
      // another case here to demonstrate how we could optimize this algorithm further (optimize = guarantee we find the solution with the smallest possible # of transactions. Actual performance will probably take a hit.)
      // I think we might still be missing opportunities for easy cancel outs since we are only working down from the ends of the array
      const friends = ['mal', 'tessa', 'sam'];
    });
    test('case 3', () => {
      // another case to test decimal input values
    });
  });
});
