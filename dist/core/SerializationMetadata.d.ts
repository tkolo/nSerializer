import ISerializer from "../serializers/ISerializer";
export declare class FieldMetadata {
    readonly serializer: ISerializer;
    constructor(serializer: ISerializer);
}
export default class SerializationMetadata {
    fields: {
        [key: string]: FieldMetadata;
    };
    converter?: (dto: any) => any;
}
