import ISerializer from "../serializers/ISerializer";
export declare class FieldMetadata {
    readonly serializer: ISerializer;
    constructor(serializer: ISerializer);
}
export default class SerializationMetadata {
    [key: string]: FieldMetadata;
}
