import serializable from "../../src/core/serializable";
import primitive from "../../src/serializers/PrimitiveSerializer";
import SimpleDtoWithMeta from "./SimpleDtoWithMeta";
import list from "../../src/serializers/ListSerializer";
import object from "../../src/serializers/ObjectSerializer";

export default class DtoWithListMeta {

  @serializable(primitive())
  public name?: string;

  @serializable(list(object(() => SimpleDtoWithMeta)))
  public objects?: SimpleDtoWithMeta[]
}
