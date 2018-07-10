import { helpers } from '../../../__data__';

describe('BinaryExpressionCompiler', () => {
  test('x = 3', async () => {
    await helpers.executeString(`
      let x = 3;
      if (x !== 3) {
        throw 'Failure';
      }
    `);
  });

  test('x += 3 [PlusEqualsToken]', async () => {
    await helpers.executeString(`
      let x = 3;
      if ((x += 3) !== 6) {
        throw 'Failure';
      }
    `);
  });

  test('x -= 3 [MinusEqualsToken]', async () => {
    await helpers.executeString(`
      let x = 3;
      x -= 3;
      if (x !== 0) {
        throw 'Failure';
      }
    `);
  });

  test('x *= 3 [AsteriskEqualsToken]', async () => {
    await helpers.executeString(`
      let x = 3;
      x *= 3;
      if (x !== 9) {
        throw 'Failure';
      }
    `);
  });

  test('x /= 3 [SlashEqualsToken]', async () => {
    await helpers.executeString(`
      let x = 3;
      x /= 3;
      if (x !== 1) {
        throw 'Failure';
      }
    `);
  });

  test.skip('x **= 3 [AsteriskAsteriskEqualsToken]', async () => {
    await helpers.executeString(`
      let x = 3;
      x **= 3;
      if (x !== 27) {
        throw 'Failure';
      }
    `);
  });

  test('3 % 3 === 0 [PercentToken]', async () => {
    await helpers.executeString(`
      if (3 % 3 !== 0) {
        throw 'Failure';
      }
    `);
  });

  test('4 % 3 === 1 [PercentToken]', async () => {
    await helpers.executeString(`
      if (4 % 3 !== 1) {
        throw 'Failure';
      }
    `);
  });

  test('x %= 3 [PercentEqualsToken]', async () => {
    await helpers.executeString(`
      let x = 3;
      x %= 3;
      if (x !== 0) {
        throw 'Failure';
      }
    `);
  });

  test('x &= 0b001 [AmpersandEqualsToken]', async () => {
    await helpers.executeString(`
      let x = 0b011;
      x &= 0b001;
      if (x !== 0b001) {
        throw 'Failure';
      }
    `);
  });

  test('x |= 0b100 [BarEqualsToken]', async () => {
    await helpers.executeString(`
      let x = 0b011;
      x |= 0b100;
      if (x !== 0b111) {
        throw 'Failure';
      }
    `);
  });

  test('x ^= 0b100 [CaretEqualsToken]', async () => {
    await helpers.executeString(`
      let x = 0b011;
      x ^= 0b110;
      if (x !== 0b101) {
        throw 'Failure';
      }
    `);
  });

  test.skip('x <<= 1 [LessThanLessThanEqualsToken]', async () => {
    await helpers.executeString(`
        let x = 0b011;
        x <<= 1;
        if (x !== 0b110) {
          throw 'Failure';
        }
      `);
  });

  test.skip('x >>= 1 [GreaterThanGreaterThanEqualsToken]', async () => {
    await helpers.executeString(`
        let x = 0b011;
        x >>= 1;
        if (x !== 0b001) {
          throw 'Failure';
        }
      `);
  });

  test('1 * 2 == 2 [AsteriskToken]', async () => {
    await helpers.executeString(`
      if (1 * 2 !== 2) {
        throw 'Failure';
      }
    `);
  });

  test('4 / 2 == 2 [SlashToken]', async () => {
    await helpers.executeString(`
      if (4 / 2 !== 2) {
        throw 'Failure';
      }
    `);
  });

  test('4 % 3 == 1 [PercentToken]', async () => {
    await helpers.executeString(`
      if (4 % 3 !== 1) {
        throw 'Failure';
      }
    `);
  });

  test('1 + 2 === 3 [PlusToken:binaryNumeric]', async () => {
    await helpers.executeString(`
      if (1 + 2 !== 3) {
        throw 'Failure';
      }
    `);
  });

  test('"1" + "2" === "12" [PlusToken:StringConcatenation:StrBoth]', async () => {
    await helpers.executeString(`
      if ('1' + '2' !== '12') {
        throw 'Failure';
      }
    `);
  });

  test.skip('1 + "3" === "13" [PlusToken:StringConcatenation:IntLeftStrRight]', async () => {
    await helpers.executeString(`
      if ('1' + '3' !== '13') {
        throw 'Failure';
      }
    `);
  });

  test.skip('"4" + 2 === "42" [PlusToken:StringConcatenation:StrLeftIntRight]', async () => {
    await helpers.executeString(`
      if ('4' + 2 !== '42') {
        throw 'Failure';
      }
    `);
  });

  test('1 - 2 = -1 [MinusToken]', async () => {
    await helpers.executeString(`
      if (1 - 2 !== -1) {
        throw 'Failure';
      }
    `);
  });

  test.skip('(224 >>> 2) == 56 [GreaterThanGreaterThanGreaterThanToken]', async () => {
    await helpers.executeString(`
      if ((224 >>> 2) !== 56) {
        throw 'Failure';
      }
    `);
  });

  test.skip('(128 >> 2) == 32 [GreaterThanGreaterThanToken]', async () => {
    await helpers.executeString(`
      if ((128 >> 2) !== 32) {
        throw 'Failure';
      }
    `);
  });

  test.skip('(-234 >> 2) == -59 [GreaterThanGreaterThanToken]', async () => {
    await helpers.executeString(`
      if ((-234 >> 2) !== -59) {
        throw 'Failure';
      }
    `);
  });

  test.skip('(128 >> 2) == 32 [GreaterThanGreaterThanToken]', async () => {
    await helpers.executeString(`
      if ((128 >> 2) !== 32) {
        throw 'Failure';
      }
    `);
  });

  test.skip('(256 >> -2) == 0 [GreaterThanGreaterThanToken]', async () => {
    await helpers.executeString(`
      if ((256 >> -2) !== 0) {
        throw 'Failure';
      }
    `);
  });

  test.skip('(-256 >> -2) == -1 [GreaterThanGreaterThanToken]', async () => {
    await helpers.executeString(`
      if ((-256 >> -2) !== -1) {
        throw 'Failure';
      }
    `);
  });

  test.skip('(32 << 2) == 128 [LessThanLessThanToken]', async () => {
    await helpers.executeString(`
      if ((32 << 2) !== 128) {
        throw 'Failure';
      }
    `);
  });

  test.skip('(-24 << 2) == 96 [LessThanLessThanToken]', async () => {
    await helpers.executeString(`
      if ((-24 << 2) !== 96)  {
        throw 'Failure';
      }
    `);
  });

  test('1 < 1 [LessThanToken]', async () => {
    await helpers.executeString(`
      if (1 < 1) {
        throw 'Failure';
      }
    `);
  });

  test('!(1 < 2) [LessThanToken]', async () => {
    await helpers.executeString(`
      if (!(1 < 2)) {
        throw 'Failure';
      }
    `);
  });

  test('!(2 <= 1) [LessThanEqualsToken]', async () => {
    await helpers.executeString(`
      if (2 <= 1) {
        throw 'Failure';
      }
    `);
  });

  test('2 <= 2 [LessThanEqualsToken]', async () => {
    await helpers.executeString(`
      if (!(2 <= 2)) {
        throw 'Failure';
      }
    `);
  });

  test('1 > 1 [GreaterThanToken]', async () => {
    await helpers.executeString(`
      if (1 > 1) {
        throw 'Failure';
      }
    `);
  });

  test('!(2 > 1) [GreaterThanToken]', async () => {
    await helpers.executeString(`
      if (!(2 > 1)) {
        throw 'Failure';
      }
    `);
  });

  test('1 >= 2 [GreaterThanEqualsToken]', async () => {
    await helpers.executeString(`
      if (1 >= 2) {
        throw 'Failure';
      }
    `);
  });

  test('!(2 >= 2) [GreaterThanEqualsToken]', async () => {
    await helpers.executeString(`
      if (!(2 >= 2)) {
        throw 'Failure';
      }
    `);
  });

  test('true && true [AmpersandAmpersandToken]', async () => {
    await helpers.executeString(`
      if (!(true && true)) {
        throw 'Failure';
      }
    `);
  });

  test('true && false [AmpersandAmpersandToken]', async () => {
    await helpers.executeString(`
      if (true && false) {
        throw 'Failure';
      }
    `);
  });

  test('!(false && true) [AmpersandAmpersandToken]', async () => {
    await helpers.executeString(`
      if (false && true) {
        throw 'Failure';
      }
    `);
  });

  test('false && false [AmpersandAmpersandToken]', async () => {
    await helpers.executeString(`
      if (false && false) {
        throw 'Failure';
      }
    `);
  });

  test('false && short-circuit [AmpersandAmpersandToken:short-circuit]', async () => {
    await helpers.executeString(`
      const fail = () => {
        throw 'Failure';
      };

      if (false && fail()) {
        throw 'Failure';
      }
    `);
  });

  test('(0 && true) === 0 [AmpersandAmpersandToken]', async () => {
    await helpers.executeString(`
      if (!((0 && true) === 0)) {
        throw 'Failure';
      }
    `);
  });

  test('( true && 3 ) === 3 [AmpersandAmpersandToken]', async () => {
    await helpers.executeString(`
      if (!(true && 3 === 3)) {
        throw 'Failure';
      }
    `);
  });

  test('true || true [BarBarToken]', async () => {
    await helpers.executeString(`
      if (!(true || true)) {
        throw 'Failure';
      }
    `);
  });

  test('true || false [BarBarToken]', async () => {
    await helpers.executeString(`
      if (!(true || false)) {
        throw 'Failure';
      }
    `);
  });

  test('false || true [BarBarToken]', async () => {
    await helpers.executeString(`
      if (!(false || true)) {
        throw 'Failure';
      }
    `);
  });
});
