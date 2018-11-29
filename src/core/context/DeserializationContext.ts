import ContextBase, { ReferenceBehavior } from "./ContextBase";
import ISerializer from "../../serializers/ISerializer";
import ISubContext from "./ISubContext";

export default class DeserializationContext extends ContextBase {
  public referenceBehavior!: ReferenceBehavior;
  public cls?: Function;

  constructor(cls?: Function) {
    super();
    this.cls = cls;
  }

  protected createSubContext<T extends ISubContext>(serializer: ISerializer): T {
    return serializer.createDeserializationSubContext();
  }
}