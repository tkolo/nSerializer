import serializable from "../../src/core/serializable";
import primitive from "../../src/serializers/PrimitiveSerializer";
import object from "../../src/serializers/ObjectSerializer";
import SimpleDtoWithMeta from "./SimpleDtoWithMeta";

export default class ComplexDtoWithMeta {
  @serializable(primitive())
  public numberField: number = 0;

  @serializable(object(SimpleDtoWithMeta))
  public subObject?: SimpleDtoWithMeta;
}
