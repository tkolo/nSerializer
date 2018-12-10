import ISerializer from "../serializers/ISerializer";
import SerializationMetadata, { FieldMetadata } from "./SerializationMetadata";

export default function serializable(serializer: ISerializer, direction: Direction = Direction.Both): (target: any, propertyKey: string) => void {
  return function (target: any, propertyKey: string): void {
    const metadata = SerializationMetadata.getOrCreateForProto(target);
    metadata.fields[propertyKey] = new FieldMetadata(serializer);
  };
}

export enum Direction {
  Both,
  OnlySerialize,
  OnlyDeserialize
}