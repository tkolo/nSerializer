import serializable, { Direction } from "../../src/core/serializable";
import primitive from "../../src/serializers/PrimitiveSerializer";
import object from "../../src/serializers/ObjectSerializer";
import converter from "../../src/core/converter";
import DeserializationContext from "../../src/core/context/DeserializationContext";

@converter(async (dto: any, context: DeserializationContext) => {
  return new SelfReferencingWithConverter(
    dto.id,
    dto.name
  );
})
export default class SelfReferencingWithConverter {
  @serializable(primitive(), Direction.OnlySerialize)
  public id: number;

  @serializable(primitive(), Direction.OnlySerialize)
  public name: string;

  @serializable(object(() => SelfReferencingWithConverter), Direction.OnlySerialize)
  public ref?: SelfReferencingWithConverter;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}