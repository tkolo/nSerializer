import ContextBase, { ReferenceBehavior } from "./ContextBase";
import ISubContext from "./ISubContext";
import ISerializer from "../../serializers/ISerializer";


export default class SerializationContext extends ContextBase {
  public readonly allowDynamic: boolean;
  public readonly referenceBehavior: ReferenceBehavior;


  constructor(allowDynamic: boolean, referenceBehavior: ReferenceBehavior) {
    super();
    this.allowDynamic = allowDynamic;
    this.referenceBehavior = referenceBehavior;
  }

  protected createSubContext<T extends ISubContext>(serializer: ISerializer): T {
    return serializer.createSerializationSubContext();
  }
}
