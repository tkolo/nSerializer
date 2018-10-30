import serializable from "../../src/core/serializable";
import primitive from "../../src/serializers/PrimitiveSerializer";

export default class SimpleDtoWithMeta {
  @serializable(primitive())
  public stringField?: string;

  @serializable(primitive())
  public numberField?: number;

  @serializable(primitive())
  public boolField?: boolean;
}