import { getCreateSmartContractName } from '../contract';
import { ContractPaths } from '../type';
import { getRelativeImport, lowerCaseFirst } from '../utils';

export const genVue = ({
  contractsPaths,
  vuePath,
  contractsPath,
  clientPath,
}: {
  readonly contractsPaths: ReadonlyArray<ContractPaths>;
  readonly vuePath: string;
  readonly contractsPath: string;
  readonly clientPath: string;
}) => {
  const clientImport = getRelativeImport(vuePath, clientPath);
  const contractImports = contractsPaths
    .map(
      ({ name, createContractPath }) =>
        `import { ${getCreateSmartContractName(name)} } from '${getRelativeImport(vuePath, createContractPath)}';`,
    )
    .join('\n');
  const contractProperties = contractsPaths
    .map(({ name }) => `this.${lowerCaseFirst(name)} = ${getCreateSmartContractName(name)}(this.client);`)
    .join('\n    ');
  const contractTypeProperties = contractsPaths
    .map(({ name }) => `public ${lowerCaseFirst(name)}: Contracts['${lowerCaseFirst(name)}'];`)
    .join('\n  ');

  const constructor = `constructor() {
  this.setHost();
}`;

  const setHost = `this.client = createClient(host);
this.developerClients = createDeveloperClients(host);
${contractProperties}`;

  return {
    js: `
import { createClient, createDeveloperClients } from '${clientImport}';

${contractImports}

export class ContractsService {
  ${constructor}

  setHost(host) {
    ${setHost}
  }
}

export const instance = new ContractsService();
    `,
    ts: `
import { Client, DeveloperClients, UserAccountProviders } from '@neo-one/client';
import { Contracts } from '${getRelativeImport(vuePath, contractsPath)}';
import { DefaultUserAccountProviders } from '${clientImport}';

export class ContractsService<TUserAccountProviders extends UserAccountProviders<any> = DefaultUserAccountProviders> {
  public client: Client<TUserAccountProviders>;
  public developerClients: DeveloperClients;
  ${contractTypeProperties}

  ${constructor}

  public setHost(host?: string) {
    ${setHost}
  }
}

export const instance: ContractsService
  `,
  };
};
