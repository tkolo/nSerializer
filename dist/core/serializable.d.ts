import ISerializer from "../serializers/ISerializer";
export default function serializable(serializer: ISerializer, direction?: Direction): (target: any, propertyKey: string) => void;
export declare enum Direction {
    Both = 0,
    OnlySerialize = 1,
    OnlyDeserialize = 2
}
