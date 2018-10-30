"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReferenceBehavior;
(function (ReferenceBehavior) {
    ReferenceBehavior[ReferenceBehavior["Error"] = 0] = "Error";
    ReferenceBehavior[ReferenceBehavior["Ignore"] = 1] = "Ignore";
    ReferenceBehavior[ReferenceBehavior["Serialize"] = 2] = "Serialize";
})(ReferenceBehavior = exports.ReferenceBehavior || (exports.ReferenceBehavior = {}));
var ContextBase = (function () {
    function ContextBase() {
        this.subContexts = {};
    }
    ContextBase.prototype.getSubContext = function (serializer) {
        var serializerId = serializer.getSerializerId();
        var subContext = this.subContexts[serializerId];
        if (!subContext) {
            subContext = this.createSubContext(serializer);
            this.subContexts[serializerId] = subContext;
        }
        return subContext;
    };
    return ContextBase;
}());
exports.default = ContextBase;
