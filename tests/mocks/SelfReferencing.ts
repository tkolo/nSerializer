import serializable from "../../src/core/serializable";
import primitive from "../../src/serializers/PrimitiveSerializer";
import object from "../../src/serializers/ObjectSerializer";

export default class SelfReferencing {
  @serializable(primitive())
  public id?: number;

  @serializable(primitive())
  public name?: string;

  @serializable(object(() => SelfReferencing))
  public ref?: SelfReferencing;
}
