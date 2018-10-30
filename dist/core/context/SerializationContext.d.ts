import ContextBase, { ReferenceBehavior } from "./ContextBase";
import ISubContext from "./ISubContext";
import ISerializer from "../../serializers/ISerializer";
export default class SerializationContext extends ContextBase {
    allowDynamic: boolean;
    referenceBehavior: ReferenceBehavior;
    protected createSubContext<T extends ISubContext>(serializer: ISerializer): T;
}
