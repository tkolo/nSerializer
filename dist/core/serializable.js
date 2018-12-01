"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerializationMetadata_1 = require("./SerializationMetadata");
exports.METADATA_FIELD = Symbol("$nSerializerMeta$$");
function serializable(serializer) {
    return function (target, propertyKey) {
        var metadata = target[exports.METADATA_FIELD];
        if (!metadata) {
            metadata = new SerializationMetadata_1.default();
            target[exports.METADATA_FIELD] = metadata;
        }
        metadata[propertyKey] = new SerializationMetadata_1.FieldMetadata(serializer);
    };
}
exports.default = serializable;
//# sourceMappingURL=serializable.js.map