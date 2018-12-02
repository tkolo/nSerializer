import ISerializer from "./ISerializer";
import SerializationContext from "../core/context/SerializationContext";
import { ContextlessSerializerBase } from "./SerializerBase";
import DeserializationContext from "../core/context/DeserializationContext";

export class ListSerializer extends ContextlessSerializerBase {
  private readonly innerSerializer: ISerializer;

  public constructor(innerSerializer: ISerializer) {
    super();
    this.innerSerializer = innerSerializer;
  }

  public async serialize(argument: any, context: SerializationContext): Promise<any> {
    if (!argument) {
      return;
    }

    const promises: Promise<any>[] = [];
    for (let val of argument) {
      promises.push(this.innerSerializer.serialize(val, context));
    }
    return await Promise.all(promises);
  }

  public async deserialize(argument: any, context: DeserializationContext): Promise<any> {
    if (!argument) {
      return;
    }

    const promises: Promise<any>[] = [];
    const obj = context.obj;
    if (obj) {
      if (obj.length > argument.length) {
        obj.splice(argument.length, obj.length - argument.length)
      }

      for (let i = 0; i < argument.length; i++) {
        const childContext = context.createChildContext(obj[i]);
        promises.push(this.innerSerializer.deserialize(argument[i], childContext));
      }

      let newObjects = await Promise.all(promises);
      for (let i = obj.length; i < newObjects.length; i++) {
        obj.push(newObjects[i]);
      }

      return obj;
    } else {
      for (let val of argument) {
        promises.push(this.innerSerializer.deserialize(val, context.createChildContext()));
      }

      return await Promise.all(promises);
    }
  }
}

export default function list(innerSerializer: ISerializer) {
  return new ListSerializer(innerSerializer);
}