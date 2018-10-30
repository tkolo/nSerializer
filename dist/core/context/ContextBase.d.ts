import ISerializer from "../../serializers/ISerializer";
import ISubContext from "./ISubContext";
export declare enum ReferenceBehavior {
    Error = 0,
    Ignore = 1,
    Serialize = 2
}
export default abstract class ContextBase {
    private readonly subContexts;
    getSubContext<T extends ISubContext>(serializer: ISerializer): T;
    protected abstract createSubContext<T extends ISubContext>(serializer: ISerializer): T;
}
