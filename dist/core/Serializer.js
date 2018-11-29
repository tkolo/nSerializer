"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var PrimitiveSerializer_1 = require("../serializers/PrimitiveSerializer");
var ListSerializer_1 = require("../serializers/ListSerializer");
var ObjectSerializer_1 = require("../serializers/ObjectSerializer");
function guessSerializer(value, type) {
    switch (typeof value) {
        case "string":
        case "number":
        case "boolean":
        case "undefined":
            return PrimitiveSerializer_1.default();
        default:
            if (Array.isArray(value)) {
                var inner = void 0;
                if (value.length === 0) {
                    inner = PrimitiveSerializer_1.default();
                }
                else {
                    inner = guessSerializer(value[0], type);
                }
                return ListSerializer_1.default(inner);
            }
            else {
                return ObjectSerializer_1.default(type);
            }
    }
}
exports.guessSerializer = guessSerializer;
function serializeInternal(object, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, guessSerializer(object, (object && object.constructor) || Object).serialize(object, context)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.serializeInternal = serializeInternal;
function deserializeInternal(dto, context) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, guessSerializer(dto, context.cls || Object).deserialize(dto, context)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.deserializeInternal = deserializeInternal;
//# sourceMappingURL=Serializer.js.map