import ISerializer from "./ISerializer";
import SerializationContext from "../core/context/SerializationContext";
import DeserializationContext from "../core/context/DeserializationContext";
export declare abstract class SerializerBase implements ISerializer {
    private readonly serializerId;
    getSerializerId(): number;
    abstract createDeserializationSubContext(): any;
    abstract createSerializationSubContext(): any;
    abstract serialize(argument: any, context: SerializationContext): Promise<any>;
    abstract deserialize(argument: any, context: DeserializationContext): Promise<any>;
}
export declare abstract class ContextlessSerializerBase extends SerializerBase {
    createDeserializationSubContext(): any;
    createSerializationSubContext(): any;
}
