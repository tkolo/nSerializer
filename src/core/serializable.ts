import ISerializer from "../serializers/ISerializer";
import SerializationMetadata, { FieldMetadata } from "./SerializationMetadata";

export const METADATA_FIELD = Symbol("$nSerializerMeta$$");

export default function serializable(serializer: ISerializer, direction: Direction = Direction.Both): (target: any, propertyKey: string) => void {
  return function (target: any, propertyKey: string): void {
    let metadata: SerializationMetadata = target[METADATA_FIELD];
    if (!metadata) {
      metadata = new SerializationMetadata();
      target[METADATA_FIELD] = metadata;
    }
    metadata.fields[propertyKey] = new FieldMetadata(serializer);
  };
}

export enum Direction {
  Both,
  OnlySerialize,
  OnlyDeserialize
}