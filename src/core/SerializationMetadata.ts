import ISerializer from "../serializers/ISerializer";


export class FieldMetadata {
  public readonly serializer: ISerializer;

  constructor(serializer: ISerializer) {
    this.serializer = serializer;
  }
}

export default class SerializationMetadata {
  [key: string]: FieldMetadata
}