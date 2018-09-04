/* @hash ba3414cc02a76dce98b23ae0175d60b4 */
// tslint:disable
/* eslint-disable */
import {
  AddressString,
  Event,
  InvocationTransaction,
  InvokeReceipt,
  ReadSmartContract,
  SmartContract,
  TransactionOptions,
  TransactionResult,
} from '@neo-one/client';
import BigNumber from 'bignumber.js';

export type TokenEvent = TokenTransferEvent;

export interface TokenTransferEventParameters {
  readonly from: AddressString | undefined;
  readonly to: AddressString | undefined;
  readonly amount: BigNumber;
}
export interface TokenTransferEvent extends Event<'transfer', TokenTransferEventParameters> {}

export interface TokenSmartContract extends SmartContract<TokenReadSmartContract> {
  readonly balanceOf: (address: AddressString) => Promise<BigNumber>;
  readonly decimals: () => Promise<BigNumber>;
  readonly deploy: (
    options?: TransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, TokenEvent>, InvocationTransaction>>;
  readonly issue: (
    to: AddressString,
    amount: BigNumber,
    options?: TransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, TokenEvent>, InvocationTransaction>>;
  readonly name: () => Promise<string>;
  readonly symbol: () => Promise<string>;
  readonly totalSupply: () => Promise<BigNumber>;
  readonly transfer: (
    from: AddressString,
    to: AddressString,
    amount: BigNumber,
    options?: TransactionOptions,
  ) => Promise<TransactionResult<InvokeReceipt<boolean, TokenEvent>, InvocationTransaction>>;
}

export interface TokenReadSmartContract extends ReadSmartContract<TokenEvent> {
  readonly balanceOf: (address: AddressString) => Promise<BigNumber>;
  readonly decimals: () => Promise<BigNumber>;
  readonly name: () => Promise<string>;
  readonly symbol: () => Promise<string>;
  readonly totalSupply: () => Promise<BigNumber>;
}
