import ISerializer from "../serializers/ISerializer";
import DeserializationContext from "./context/DeserializationContext";


export class FieldMetadata {
  public readonly serializer: ISerializer;

  constructor(serializer: ISerializer) {
    this.serializer = serializer;
  }
}

export default class SerializationMetadata {
  fields: { [key: string]: FieldMetadata } = {};

  public converter?: (dto: any, context: DeserializationContext) => Promise<any>;
}
