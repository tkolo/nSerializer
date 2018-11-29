import SerializationContext from "../core/context/SerializationContext";
import { SerializerBase } from "./SerializerBase";
import ISubContext from "../core/context/ISubContext";
import DeserializationContext from "../core/context/DeserializationContext";
declare class ObjectDeserializationContext implements ISubContext {
    private readonly _objects;
    private readonly _listeners;
    getObjectForId(id: string): any;
    addObjectForId(id: string, obj: any): void;
    onObjectAddedAdd(listener: (id: string, obj: any) => void): void;
    onObjectAddedRemove(listener: (id: string, obj: any) => void): void;
    private triggerOnObjectAdded;
}
export declare class ObjectSerializer extends SerializerBase {
    private readonly cls;
    constructor(cls: {
        new (): any;
    });
    createDeserializationSubContext(): ObjectDeserializationContext;
    createSerializationSubContext(): any;
    serialize(argument: any, context: SerializationContext): Promise<any>;
    deserialize(argument: any, context: DeserializationContext): Promise<any>;
}
export default function object(cls: new () => any): ObjectSerializer;
export {};
