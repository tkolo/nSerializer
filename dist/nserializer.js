"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SerializationContext_1 = require("./core/context/SerializationContext");
var Serializer_1 = require("./core/Serializer");
var DeserializationContext_1 = require("./core/context/DeserializationContext");
var ContextBase_1 = require("./core/context/ContextBase");
exports.defaultSerializationSettings = {
    allowDynamic: false,
    referenceBehavior: ContextBase_1.ReferenceBehavior.Error
};
exports.defaultDeserializationSettingss = {
    referenceBehavior: ContextBase_1.ReferenceBehavior.Error
};
function serializeObject(object, settings) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var mergedSettings, context;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mergedSettings = tslib_1.__assign({}, exports.defaultSerializationSettings, settings);
                    context = new SerializationContext_1.default(mergedSettings.allowDynamic, mergedSettings.referenceBehavior);
                    return [4, Serializer_1.serializeInternal(object, context)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.serializeObject = serializeObject;
function deserializeObject(object, cls, settings) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var mergedSettings, context;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mergedSettings = tslib_1.__assign({}, exports.defaultDeserializationSettingss, settings);
                    context = new DeserializationContext_1.default(cls, mergedSettings.referenceBehavior);
                    return [4, Serializer_1.deserializeInternal(object, context)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.deserializeObject = deserializeObject;
function populateObject(object, dto, settings) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var mergedSettings, context;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mergedSettings = tslib_1.__assign({}, exports.defaultDeserializationSettingss, settings);
                    context = new DeserializationContext_1.default(object.constructor, mergedSettings.referenceBehavior, object);
                    return [4, Serializer_1.deserializeInternal(dto, context)];
                case 1: return [2, _a.sent()];
            }
        });
    });
}
exports.populateObject = populateObject;
//# sourceMappingURL=nserializer.js.map