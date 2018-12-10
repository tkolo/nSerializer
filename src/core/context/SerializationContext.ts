import ContextBase, { ReferenceBehavior } from "./ContextBase";
import ISubContext from "./ISubContext";
import ISerializer from "../../serializers/ISerializer";
import { guessSerializer, serializeInternal } from "../Serializer";


export default class SerializationContext extends ContextBase {
  public readonly allowDynamic: boolean;
  public readonly referenceBehavior: ReferenceBehavior;


  constructor(allowDynamic: boolean, referenceBehavior: ReferenceBehavior) {
    super();
    this.allowDynamic = allowDynamic;
    this.referenceBehavior = referenceBehavior;
  }

  public async serialize<T>(object: T): Promise<any> {
    if (!object) {
      return undefined;
    }
    return await serializeInternal(object, this.createSubContext(guessSerializer(object, object.constructor)));
  }

  protected createSubContext<T extends ISubContext>(serializer: ISerializer): T {
    return serializer.createSerializationSubContext();
  }
}
