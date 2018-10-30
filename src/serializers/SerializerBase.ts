import ISerializer from "./ISerializer";
import SerializationContext from "../core/context/SerializationContext";
import DeserializationContext from "../core/context/DeserializationContext";

let NEXT_SERIALIZER_ID = 0;

export abstract class SerializerBase implements ISerializer {

  private readonly serializerId: number = NEXT_SERIALIZER_ID++;

  public getSerializerId(): number {
    return 0;
  }

  public abstract createDeserializationSubContext(): any;

  public abstract createSerializationSubContext(): any;

  public abstract serialize(argument: any, context: SerializationContext): Promise<any>;

  public abstract deserialize(argument: any, context: DeserializationContext): Promise<any>;

}

export abstract class ContextlessSerializerBase extends SerializerBase {

  createDeserializationSubContext(): any {
  }

  createSerializationSubContext(): any {
  }

}