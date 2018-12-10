import SerializationMetadata from "./SerializationMetadata";
import DeserializationContext from "./context/DeserializationContext";

export default function converter(func: (dto: any, context: DeserializationContext) => Promise<any>): (target: Function) => void {
  return (target: Function) => {
    const metadata = SerializationMetadata.getOrCreateForProto(target.prototype);
    metadata.converter = func;
  }
}