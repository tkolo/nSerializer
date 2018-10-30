import ISerializer from "./ISerializer";
import SerializationContext from "../core/context/SerializationContext";
import { ContextlessSerializerBase } from "./SerializerBase";
import DeserializationContext from "../core/context/DeserializationContext";
export declare class ListSerializer extends ContextlessSerializerBase {
    private readonly innerSerializer;
    constructor(innerSerializer: ISerializer);
    serialize(argument: any, context: SerializationContext): Promise<any>;
    deserialize(argument: any, context: DeserializationContext): Promise<any>;
}
export default function list(innerSerializer: ISerializer): ListSerializer;
