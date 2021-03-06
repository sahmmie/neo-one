import { helpers } from '../../../__data__';

describe('ElementAccessExpressionCompiler', () => {
  test('[0, 1, 2][idx]', async () => {
    await helpers.executeString(`
      const x: Array<number> = [0] as Array<number>;

      assertEqual(x.length, 1);
      assertEqual(x['length'], 1);

      const y: Array<number> = x;

      y[2];
      y[2] = 2;
      y['length'];
      const length: 'length' | 'map' = 'length' as 'map' | 'length';
      assertEqual(y[length], 3);
      assertEqual(y.length, 3);
      assertEqual(y[0], 0);
      assertEqual(y[1] as number | undefined, undefined);
      assertEqual(y[2], 2);
      assertEqual(y[2] += 1, 3);
      assertEqual(y[2], 3);
    `);
  });

  test('[0, 1, 2]["idx"]', async () => {
    helpers.compileString(
      `
      const x = [0, 1, 2]
      x['0'];
      const length: string = 'length' as string;
      x[length];
    `,
      { type: 'error' },
    );
  });

  const buffer = Buffer.from([0, 1, 2]);

  test('Buffer.from([0, 1, 2])[idx]', async () => {
    await helpers.executeString(`
      const x = ${helpers.getBuffer(buffer)};

      x[2];
      x['length'];
      const length: 'length' | 'equals' = 'length' as 'length' | 'equals';
      assertEqual(x[length], 3);
      assertEqual(x.length, 3);
      assertEqual(x[0], 0);
      assertEqual(x[1] as number | undefined, 1);
      assertEqual(x[2], 2);
      assertEqual(x[3] as number | undefined, undefined);
    `);
  });

  test('Buffer.from([0, 1, 2])["idx"]', async () => {
    helpers.compileString(
      `
      const x = ${helpers.getBuffer(buffer)};
      x['0'];
      const length: string = 'length' as string;
      x[length];
    `,
      { type: 'error' },
    );
  });

  test('{ a: 0, b: 1 }[element]', async () => {
    await helpers.executeString(`
      const x = { a: 0, b: 1 };

      assertEqual(x['a'], 0);
      assertEqual(x['b'], 1);

      x['a'] = 1;
      assertEqual(x['a'] += 1, 2);
      assertEqual(x['a'], 2);
    `);
  });

  test('{ [Symbol.for("a")]: 0 }[element]', async () => {
    await helpers.executeString(`
      const a = Symbol.for('a');
      const x = { [a]: 0 };

      assertEqual(x[a], 0);

      x[a] = 1;
      assertEqual(x[a] += 1, 2);
      assertEqual(x[a], 2);
    `);
  });

  test('mixed index types', async () => {
    await helpers.executeString(`
      const a: string | number = 0 as string | number;
      const x = { [a]: 0 };
      if (x[a] !== 0) {
        throw 'Failure';
      }

      if ((x[a] += 1) !== 1) {
        throw 'Failure';
      }

      if (x[a] !== 1) {
        throw 'Failure';
      }

      x[a];
    `);
  });

  test('buffer length', async () => {
    await helpers.executeString(`
      const x = Buffer.from('', 'hex');

      x['length'];
      assertEqual(x['length'], 0);

      const y = Buffer.from('30', 'hex');
      assertEqual(y['length'], 1);

      const z = Buffer.from('3030', 'hex');
      const length: 'length' | 'equals' = 'length' as 'length' | 'equals';
      assertEqual(z[length], 2);
    `);
  });

  test('Symbol["iterator"]', async () => {
    await helpers.executeString(`
      const x = Symbol['iterator'];

      assertEqual(x, Symbol.iterator);
    `);
  });

  test('Object["keys"]', async () => {
    helpers.compileString(
      `
      const x = Object['keys'];

      assertEqual(x !== undefined, true);
    `,
      { type: 'error' },
    );
  });

  test('optional element access returns undefined when undefined', async () => {
    await helpers.executeString(`
          const bar: { optionalProp: number } | null | undefined = null as { optionalProp: number } | null | undefined;

          assertEqual(bar?.['optionalProp'], undefined);
        `);
  });

  test('optional element access returns undefined when null', async () => {
    await helpers.executeString(`
          const bar: { optionalProp: number } | null | undefined = undefined as { optionalProp: number } | null | undefined;

          assertEqual(bar?.['optionalProp'], undefined);
        `);
  });

  test('optional element access returns property when defined', async () => {
    await helpers.executeString(`
          const bar: { optionalProp: number } | null | undefined = { optionalProp: 10 } as { optionalProp: number } | null | undefined;

          assertEqual(bar?.['optionalProp'], 10);
        `);
  });
});
