"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SerializerBase_1 = require("./SerializerBase");
var PrimitiveSerializer = (function (_super) {
    tslib_1.__extends(PrimitiveSerializer, _super);
    function PrimitiveSerializer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PrimitiveSerializer.prototype.serialize = function (argument, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, argument];
            });
        });
    };
    PrimitiveSerializer.prototype.deserialize = function (argument, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, argument];
            });
        });
    };
    return PrimitiveSerializer;
}(SerializerBase_1.ContextlessSerializerBase));
exports.PrimitiveSerializer = PrimitiveSerializer;
function primitive() {
    return new PrimitiveSerializer();
}
exports.default = primitive;
//# sourceMappingURL=PrimitiveSerializer.js.map