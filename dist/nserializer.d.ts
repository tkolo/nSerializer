import { ReferenceBehavior } from "./core/context/ContextBase";
export interface SerializationSettings {
    allowDynamic: boolean;
    referenceBehavior: ReferenceBehavior;
}
export interface DeserializationSettings {
    referenceBehavior: ReferenceBehavior;
}
export declare var defaultSerializationSettings: SerializationSettings;
export declare var defaultDeserializationSettingss: DeserializationSettings;
export declare function serializeObject(object: any, settings?: Partial<SerializationSettings>): Promise<any>;
export declare function deserializeObject<T>(object: any, cls?: Function, settings?: Partial<DeserializationSettings>): Promise<T>;
export declare function populateObject<T>(object: T, dto: any, cls?: Function, settings?: Partial<DeserializationSettings>): Promise<T>;
