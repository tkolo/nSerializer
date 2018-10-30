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
    let promises: Promise<any>[] = [];
    for (let val of argument) {
      promises.push(this.innerSerializer.serialize(val, context));
    }
    return await Promise.all(promises);
  }

  public async deserialize(argument: any, context: DeserializationContext): Promise<any> {
    let promises: Promise<any>[] = [];
    for (let val of argument) {
      promises.push(this.innerSerializer.deserialize(val, context));
    }
    return await Promise.all(promises);
  }
}

export default function list(innerSerializer: ISerializer) {
  return new ListSerializer(innerSerializer);
}