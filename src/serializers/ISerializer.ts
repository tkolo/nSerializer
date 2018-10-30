import SerializationContext from "../core/context/SerializationContext";
import DeserializationContext from "../core/context/DeserializationContext";

export default interface ISerializer {
  getSerializerId(): number;

  createSerializationSubContext(): any;

  createDeserializationSubContext(): any;

  serialize(argument: any, context: SerializationContext): Promise<any>;

  deserialize(argument: any, context: DeserializationContext): Promise<any>;
}
