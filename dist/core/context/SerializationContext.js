"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ContextBase_1 = require("./ContextBase");
var SerializationContext = (function (_super) {
    tslib_1.__extends(SerializationContext, _super);
    function SerializationContext() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SerializationContext.prototype.createSubContext = function (serializer) {
        return serializer.createSerializationSubContext();
    };
    return SerializationContext;
}(ContextBase_1.default));
exports.default = SerializationContext;
//# sourceMappingURL=SerializationContext.js.map