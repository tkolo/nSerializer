import ISerializer from "../serializers/ISerializer";
import SerializationContext from "./context/SerializationContext";
import DeserializationContext from "./context/DeserializationContext";
export declare function guessSerializer(value: any): ISerializer;
export declare function serializeInternal(object: any, context: SerializationContext): Promise<object>;
export declare function deserializeInternal<T>(dto: any, context: DeserializationContext): Promise<T>;
