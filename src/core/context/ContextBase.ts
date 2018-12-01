import ISerializer from "../../serializers/ISerializer";
import ISubContext from "./ISubContext";

export enum ReferenceBehavior {
  Error,
  Ignore,
  Serialize
}

export default abstract class ContextBase {
  protected subContexts: { [key: number]: any } = {};

  public getSubContext<T extends ISubContext>(serializer: ISerializer): T {
    let serializerId = serializer.getSerializerId();
    let subContext = this.subContexts[serializerId];
    if (!subContext) {
      subContext = this.createSubContext(serializer);
      this.subContexts[serializerId] = subContext;
    }
    return subContext;
  }

  protected abstract createSubContext<T extends ISubContext>(serializer: ISerializer): T;
}