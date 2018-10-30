import ContextBase, { ReferenceBehavior } from "./ContextBase";
import ISubContext from "./ISubContext";
import ISerializer from "../../serializers/ISerializer";


export default class SerializationContext extends ContextBase {
  public allowDynamic!: boolean;
  public referenceBehavior!: ReferenceBehavior;

  protected createSubContext<T extends ISubContext>(serializer: ISerializer): T {
    return serializer.createSerializationSubContext();
  }
}
