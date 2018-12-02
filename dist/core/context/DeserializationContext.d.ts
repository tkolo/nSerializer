import ContextBase, { ReferenceBehavior } from "./ContextBase";
import ISerializer from "../../serializers/ISerializer";
import ISubContext from "./ISubContext";
export default class DeserializationContext extends ContextBase {
    readonly referenceBehavior: ReferenceBehavior;
    readonly cls?: Function;
    readonly obj?: any;
    constructor(cls?: Function, referenceBehavior?: ReferenceBehavior, obj?: any);
    createChildContext(obj?: any): DeserializationContext;
    protected createSubContext<T extends ISubContext>(serializer: ISerializer): T;
}
