import serializable, { Direction } from "../../src/core/serializable";
import primitive from "../../src/serializers/PrimitiveSerializer";
import converter from "../../src/core/converter";
import DeserializationContext from "../../src/core/context/DeserializationContext";

export abstract class Hierarchic {
  @serializable(primitive())
  public name?: string;
}

export class SubTypeA extends Hierarchic {
  @serializable(primitive())
  public count?: number;
}

@converter(async (dto: any, context: DeserializationContext) => {
  return new SubTypeBWithConverter(false);
})
export class SubTypeBWithConverter extends Hierarchic {

  @serializable(primitive(), Direction.OnlySerialize)
  public fromConstructor: boolean;

  constructor(fromConstructor: boolean) {
    super();
    this.fromConstructor = fromConstructor;
  }
}