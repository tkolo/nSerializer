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
  let context = new SerializationContext();
  let mergedSettings = {...defaultSerializationSettings, ...settings};
  context.allowDynamic = mergedSettings.allowDynamic;
  context.referenceBehavior = mergedSettings.referenceBehavior;

  return await serializeInternal(object, context)
}

export async function deserializeObject<T>(input: any, cls?: new () => T, settings?: Partial<DeserializationSettings>): Promise<T> {
  let context = new DeserializationContext(cls);
  let mergedSettings = {...defaultDeserializationSettingss, ...settings};
  context.referenceBehavior = mergedSettings.referenceBehavior;
  return await deserializeInternal<T>(input, context);
}
