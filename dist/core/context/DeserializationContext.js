"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ContextBase_1 = require("./ContextBase");
var DeserializationContext = (function (_super) {
    tslib_1.__extends(DeserializationContext, _super);
    function DeserializationContext(cls) {
        var _this = _super.call(this) || this;
        _this.cls = cls;
        return _this;
    }
    DeserializationContext.prototype.createSubContext = function (serializer) {
        return serializer.createDeserializationSubContext();
    };
    return DeserializationContext;
}(ContextBase_1.default));
exports.default = DeserializationContext;
//# sourceMappingURL=DeserializationContext.js.map