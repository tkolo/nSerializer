import ISerializer from "../serializers/ISerializer";
import primitive from "../serializers/PrimitiveSerializer";
import list from "../serializers/ListSerializer";
import object from "../serializers/ObjectSerializer";
import SerializationContext from "./context/SerializationContext";
import DeserializationContext from "./context/DeserializationContext";

export function guessSerializer(value: any): ISerializer {
  switch (typeof value) {
    case "string":
    case "number":
    case "boolean":
    case "undefined":
      return primitive();
    default:
      if (Array.isArray(value)) {
        let inner: ISerializer;
        if (value.length === 0) {
          inner = primitive();
        } else {
          inner = guessSerializer(value[0])
        }
        return list(inner);
      } else {
        return object();
      }
  }
}

export async function serializeInternal(object: any, context: SerializationContext): Promise<object> {
  return await guessSerializer(object).serialize(object, context);
}

export async function deserializeInternal<T>(dto: any, context: DeserializationContext): Promise<T> {
  return await guessSerializer(dto).deserialize(dto, context);
}
