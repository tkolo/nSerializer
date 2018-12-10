"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ContextBase_1 = require("./ContextBase");
var nserializer_1 = require("../../nserializer");
var Serializer_1 = require("../Serializer");
var DeserializationContext = (function (_super) {
    tslib_1.__extends(DeserializationContext, _super);
    function DeserializationContext(cls, referenceBehavior, obj) {
        if (referenceBehavior === void 0) { referenceBehavior = nserializer_1.defaultDeserializationSettingss.referenceBehavior; }
        var _this = _super.call(this) || this;
        _this.cls = cls;
        _this.referenceBehavior = referenceBehavior;
        _this.obj = obj;
        return _this;
    }
    DeserializationContext.prototype.createChildContext = function (obj) {
        var result = new DeserializationContext(this.cls, this.referenceBehavior, obj);
        result.subContexts = this.subContexts;
        return result;
    };
    DeserializationContext.prototype.createSubContext = function (serializer) {
        return serializer.createDeserializationSubContext();
    };
    DeserializationContext.prototype.deserialize = function (dto, object) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!dto) {
                            return [2, object];
                        }
                        return [4, Serializer_1.deserializeInternal(dto, this.createSubContext(Serializer_1.guessSerializer(dto, this.cls || Object)))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return DeserializationContext;
}(ContextBase_1.default));
exports.default = DeserializationContext;
//# sourceMappingURL=DeserializationContext.js.map