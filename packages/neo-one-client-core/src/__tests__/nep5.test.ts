// tslint:disable no-object-mutation no-any
import BigNumber from 'bignumber.js';
import { data, factory } from '../__data__';
import { Client } from '../Client';
import * as nep5 from '../nep5';

describe('nep5', () => {
  test('abi', () => {
    expect(nep5.abi(4)).toMatchSnapshot();
  });

  const smartContract: { decimals?: () => BigNumber } = {};
  const clientSmartContract = jest.fn(() => smartContract);
  const client: Client = {
    smartContract: clientSmartContract,
  } as any;

  test('getDecimals', async () => {
    smartContract.decimals = jest.fn(() => data.bigNumbers.a);

    const result = await nep5.getDecimals(client, factory.createSmartContractDefinition().networks, 'main');

    expect(result).toEqual(data.bigNumbers.a.toNumber());
  });

  test('createNEP5SmartContract', () => {
    const contract = nep5.createNEP5SmartContract(client, factory.createSmartContractDefinition().networks, 8);

    expect(contract).toEqual(smartContract);
    expect(clientSmartContract.mock.calls).toMatchSnapshot();
  });
});
