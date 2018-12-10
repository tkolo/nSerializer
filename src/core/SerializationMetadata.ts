import ISerializer from "../serializers/ISerializer";


export class FieldMetadata {
  public readonly serializer: ISerializer;

  constructor(serializer: ISerializer) {
    this.serializer = serializer;
  }
}

export default class SerializationMetadata {
  fields: { [key: string]: FieldMetadata } = {};

  public converter?: (dto: any) => any;
}