import ContextBase, { ReferenceBehavior } from "./ContextBase";
import ISerializer from "../../serializers/ISerializer";
import ISubContext from "./ISubContext";
import { defaultDeserializationSettingss } from "../../nserializer";

export default class DeserializationContext extends ContextBase {
  public readonly referenceBehavior!: ReferenceBehavior;
  public readonly cls?: Function;
  public readonly obj?: any;

  constructor(cls?: Function, referenceBehavior = defaultDeserializationSettingss.referenceBehavior, obj?: any) {
    super();
    this.cls = cls;
    this.referenceBehavior = referenceBehavior;
    this.obj = obj;
  }

  public createChildContext(obj: any): DeserializationContext {
    const result = new DeserializationContext(this.cls, this.referenceBehavior, obj);
    result.subContexts = this.subContexts;
    return result;
  }

  protected createSubContext<T extends ISubContext>(serializer: ISerializer): T {
    return serializer.createDeserializationSubContext();
  }
}
