import ContextBase, { ReferenceBehavior } from "./ContextBase";
import ISerializer from "../../serializers/ISerializer";
import ISubContext from "./ISubContext";
export default class DeserializationContext extends ContextBase {
    referenceBehavior: ReferenceBehavior;
    cls?: new () => any;
    constructor(cls?: new () => any);
    protected createSubContext<T extends ISubContext>(serializer: ISerializer): T;
}
