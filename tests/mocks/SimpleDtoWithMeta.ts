import serializable, { Direction } from "../../src/core/serializable";
import primitive from "../../src/serializers/PrimitiveSerializer";
import converter from "../../src/core/converter";

@converter((dto) => new SimpleDtoWithMeta(dto.stringField))
export default class SimpleDtoWithMeta {
  @serializable(primitive(), Direction.OnlySerialize)
  public stringField?: string;

  @serializable(primitive())
  public numberField?: number;

  @serializable(primitive())
  public boolField?: boolean;


  constructor(stringField?: string) {
    this.stringField = stringField;
  }
}
