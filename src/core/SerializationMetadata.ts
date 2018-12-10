import ISerializer from "../serializers/ISerializer";
import DeserializationContext from "./context/DeserializationContext";


export const METADATA_FIELD = Symbol("$nSerializerMeta$$");

export class FieldMetadata {
  public readonly serializer: ISerializer;

  constructor(serializer: ISerializer) {
    this.serializer = serializer;
  }
}

export default class SerializationMetadata {
  fields: { [key: string]: FieldMetadata } = {};

  public converter?: (dto: any, context: DeserializationContext) => Promise<any>;

  public static getOrCreateForProto(proto: { [METADATA_FIELD]: SerializationMetadata }): SerializationMetadata {
    if (proto.hasOwnProperty(METADATA_FIELD)) {
      return proto[METADATA_FIELD];
    }
    const meta = new SerializationMetadata();
    if (proto[METADATA_FIELD]) {
      meta.fields = SerializationMetadata.chainify(proto[METADATA_FIELD].fields)
    }
    proto[METADATA_FIELD] = meta;
    return meta;
  }

  private static chainify<T>(obj: T): T {
    const a: any = () => {
    };
    a.prototype = obj;
    return new a();
  }
}
