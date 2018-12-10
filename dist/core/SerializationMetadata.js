"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METADATA_FIELD = Symbol("$nSerializerMeta$$");
var FieldMetadata = (function () {
    function FieldMetadata(serializer) {
        this.serializer = serializer;
    }
    return FieldMetadata;
}());
exports.FieldMetadata = FieldMetadata;
var SerializationMetadata = (function () {
    function SerializationMetadata() {
        this.fields = {};
    }
    SerializationMetadata.getOrCreateForProto = function (proto) {
        if (proto.hasOwnProperty(exports.METADATA_FIELD)) {
            return proto[exports.METADATA_FIELD];
        }
        var meta = new SerializationMetadata();
        if (proto[exports.METADATA_FIELD]) {
            meta.fields = SerializationMetadata.chainify(proto[exports.METADATA_FIELD].fields);
        }
        proto[exports.METADATA_FIELD] = meta;
        return meta;
    };
    SerializationMetadata.chainify = function (obj) {
        var a = function () {
        };
        a.prototype = obj;
        return new a();
    };
    return SerializationMetadata;
}());
exports.default = SerializationMetadata;
//# sourceMappingURL=SerializationMetadata.js.map