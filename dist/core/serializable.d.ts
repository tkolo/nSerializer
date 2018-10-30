import ISerializer from "../serializers/ISerializer";
export declare const METADATA_FIELD = "$$nSerializerMeta$$";
export default function serializable(serializer: ISerializer): (target: any, propertyKey: string) => void;
