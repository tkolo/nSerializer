"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ContextBase_1 = require("./ContextBase");
var Serializer_1 = require("../Serializer");
var SerializationContext = (function (_super) {
    tslib_1.__extends(SerializationContext, _super);
    function SerializationContext(allowDynamic, referenceBehavior) {
        var _this = _super.call(this) || this;
        _this.allowDynamic = allowDynamic;
        _this.referenceBehavior = referenceBehavior;
        return _this;
    }
    SerializationContext.prototype.serialize = function (object) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!object) {
                            return [2, undefined];
                        }
                        return [4, Serializer_1.serializeInternal(object, this.createSubContext(Serializer_1.guessSerializer(object, object.constructor)))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    SerializationContext.prototype.createSubContext = function (serializer) {
        return serializer.createSerializationSubContext();
    };
    return SerializationContext;
}(ContextBase_1.default));
exports.default = SerializationContext;
//# sourceMappingURL=SerializationContext.js.map