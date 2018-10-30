import ISerializer from "../serializers/ISerializer";
import SerializationMetadata, { FieldMetadata } from "./SerializationMetadata";

export const METADATA_FIELD = "$$nSerializerMeta$$";

export default function serializable(serializer: ISerializer): (target: any, propertyKey: string) => void {
  return function (target: any, propertyKey: string): void {
    let metadata: SerializationMetadata = target[METADATA_FIELD];
    if (!metadata) {
      metadata = new SerializationMetadata();
      target[METADATA_FIELD] = metadata;
    }
    metadata[propertyKey] = new FieldMetadata(serializer);
  };
}