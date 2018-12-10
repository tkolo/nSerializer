"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var serializable_1 = require("./serializable");
var SerializationMetadata_1 = require("./SerializationMetadata");
function converter(func) {
    return function (target) {
        var metadata = target.prototype[serializable_1.METADATA_FIELD];
        if (!metadata) {
            metadata = new SerializationMetadata_1.default();
            target.prototype[serializable_1.METADATA_FIELD] = metadata;
        }
        metadata.converter = func;
    };
}
exports.default = converter;
//# sourceMappingURL=converter.js.map