import SerializationContext from "../core/context/SerializationContext";
import { ContextlessSerializerBase } from "./SerializerBase";
import DeserializationContext from "../core/context/DeserializationContext";
export declare class PrimitiveSerializer extends ContextlessSerializerBase {
    serialize(argument: any, context: SerializationContext): Promise<any>;
    deserialize(argument: any, context: DeserializationContext): Promise<any>;
}
export default function primitive(): PrimitiveSerializer;
