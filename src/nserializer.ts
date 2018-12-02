import SerializationContext from "./core/context/SerializationContext";
import { deserializeInternal, serializeInternal } from "./core/Serializer";
import DeserializationContext from "./core/context/DeserializationContext";
import { ReferenceBehavior } from "./core/context/ContextBase";

export interface SerializationSettings {
  allowDynamic: boolean
  referenceBehavior: ReferenceBehavior
}

export interface DeserializationSettings {
  referenceBehavior: ReferenceBehavior
}

export var defaultSerializationSettings: SerializationSettings = {
  allowDynamic: false,
  referenceBehavior: ReferenceBehavior.Error
};

export var defaultDeserializationSettingss: DeserializationSettings = {
  referenceBehavior: ReferenceBehavior.Error
};

export async function serializeObject(object: any, settings?: Partial<SerializationSettings>): Promise<any> {
  const mergedSettings = {...defaultSerializationSettings, ...settings};
  const context = new SerializationContext(mergedSettings.allowDynamic, mergedSettings.referenceBehavior);
  return await serializeInternal(object, context)
}

export async function deserializeObject<T>(object: any, cls?: Function, settings?: Partial<DeserializationSettings>): Promise<T> {
  const mergedSettings = {...defaultDeserializationSettingss, ...settings};
  const context = new DeserializationContext(cls, mergedSettings.referenceBehavior);
  return await deserializeInternal<T>(object, context);
}

export async function populateObject<T>(object: T, dto: any, cls?: Function, settings?: Partial<DeserializationSettings>): Promise<T> {
  const mergedSettings = {...defaultDeserializationSettingss, ...settings};
  const context = new DeserializationContext(cls || object.constructor, mergedSettings.referenceBehavior, object);
  return await deserializeInternal<T>(dto, context);
}