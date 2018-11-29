import ISerializer from "../serializers/ISerializer";
import primitive from "../serializers/PrimitiveSerializer";
import list from "../serializers/ListSerializer";
import object from "../serializers/ObjectSerializer";
import SerializationContext from "./context/SerializationContext";
import DeserializationContext from "./context/DeserializationContext";

export function guessSerializer(value: any, type: new () => any): ISerializer {
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
          inner = guessSerializer(value[0], type)
        }
        return list(inner);
      } else {
        return object(type);
      }
  }
}

export async function serializeInternal(object: any, context: SerializationContext): Promise<object> {
  return await guessSerializer(object, (object && object.constructor) || Object).serialize(object, context);
}

export async function deserializeInternal<T>(dto: any, context: DeserializationContext): Promise<T> {
  return await guessSerializer(dto, context.cls || Object).deserialize(dto, context);
}
