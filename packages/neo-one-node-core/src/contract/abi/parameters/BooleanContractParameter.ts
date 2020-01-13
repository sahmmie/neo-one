import { BinaryWriter, BooleanContractParameterJSON, IOHelper, utils } from '@neo-one/client-common';
import { DeserializeWireBaseOptions, SerializeJSONContext } from '../../../Serializable';
import { ContractParameterBase } from './ContractParameterBase';
import { ContractParameterType } from './ContractParameterType';

export class BooleanContractParameter extends ContractParameterBase<
  BooleanContractParameter,
  BooleanContractParameterJSON,
  ContractParameterType.Boolean
> {
  public static readonly TRUE = Buffer.from([1]);
  public static readonly FALSE = Buffer.from([0]);
  public static deserializeWireBase(options: DeserializeWireBaseOptions): BooleanContractParameter {
    const { reader } = options;
    const { name } = super.deserializeContractParameterBaseWireBase(options);
    const value = reader.readBoolean();

    return new this(value, name);
  }

  public readonly type = ContractParameterType.Boolean;
  public readonly name: string;
  public readonly value: boolean;
  private readonly sizeInternal: () => number;

  public constructor(value: boolean, name: string) {
    super();
    this.value = value;
    this.name = name;
    this.sizeInternal = utils.lazy(() => IOHelper.sizeOfBoolean);
  }

  public get size(): number {
    return this.sizeInternal();
  }

  public asBuffer(): Buffer {
    return this.value ? BooleanContractParameter.TRUE : BooleanContractParameter.FALSE;
  }

  public asBoolean(): boolean {
    return this.value;
  }

  public serializeWireBase(writer: BinaryWriter): void {
    super.serializeWireBase(writer);
    writer.writeBoolean(this.value);
  }

  public serializeJSON(_context: SerializeJSONContext): BooleanContractParameterJSON {
    return {
      type: 'Boolean',
      name: this.name,
      value: this.value,
    };
  }
}