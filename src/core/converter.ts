import { METADATA_FIELD } from "./serializable";
import SerializationMetadata from "./SerializationMetadata";
import DeserializationContext from "./context/DeserializationContext";

export default function converter(func: (dto: any, context: DeserializationContext) => Promise<any>): (target: Function) => void {
  return (target: Function) => {
    let metadata: SerializationMetadata = target.prototype[METADATA_FIELD];
    if (!metadata) {
      metadata = new SerializationMetadata();
      target.prototype[METADATA_FIELD] = metadata;
    }
    metadata.converter = func;
  }
}