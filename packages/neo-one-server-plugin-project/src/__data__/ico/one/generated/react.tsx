// tslint:disable
import { Client } from '@neo-one/client';
import * as React from 'react';
import { Contracts } from './types';
import { createClient } from './client';
import { createTokenSmartContract } from './Token/contract';
import { createICOSmartContract } from './ICO/contract';

export interface WithClient<TClient extends Client> {
  readonly client: TClient;
}
export type ContractsWithClient<TClient extends Client> = Contracts & WithClient<TClient>;
const Context: any = React.createContext<ContractsWithClient<Client>>(undefined as any);

export interface ContractsProviderProps<TClient extends Client> {
  readonly client?: TClient;
  readonly children?: React.ReactNode;
}
export const ContractsProvider = <TClient extends Client>({
  client: clientIn,
  children,
}: ContractsProviderProps<TClient>) => {
  const client = clientIn === undefined ? createClient() : clientIn;

  return (
    <Context.Provider
      value={{
        client,
        token: createTokenSmartContract(client),
        ico: createICOSmartContract(client),
      }}
    >
      {children}
    </Context.Provider>
  );
};

export interface WithContractsProps<TClient extends Client> {
  readonly children: (contracts: ContractsWithClient<TClient>) => React.ReactNode;
}
export const WithContracts = <TClient extends Client>({ children }: WithContractsProps<TClient>) => (
  <Context.Consumer>{children}</Context.Consumer>
);