import SerializationContext from "../core/context/SerializationContext";
import { ContextlessSerializerBase } from "./SerializerBase";
import DeserializationContext from "../core/context/DeserializationContext";

export class PrimitiveSerializer extends ContextlessSerializerBase {
  public async serialize(argument: any, context: SerializationContext): Promise<any> {
    return argument;
  }

  public async deserialize(argument: any, context: DeserializationContext): Promise<any> {
    return argument;
  }

}

export default function primitive(): PrimitiveSerializer {
  return new PrimitiveSerializer();
}