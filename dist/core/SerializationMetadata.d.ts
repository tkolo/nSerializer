import ISerializer from "../serializers/ISerializer";
import DeserializationContext from "./context/DeserializationContext";
export declare class FieldMetadata {
    readonly serializer: ISerializer;
    constructor(serializer: ISerializer);
}
export default class SerializationMetadata {
    fields: {
        [key: string]: FieldMetadata;
    };
    converter?: (dto: any, context: DeserializationContext) => Promise<any>;
}
