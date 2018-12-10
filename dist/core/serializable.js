"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerializationMetadata_1 = require("./SerializationMetadata");
function serializable(serializer, direction) {
    if (direction === void 0) { direction = Direction.Both; }
    return function (target, propertyKey) {
        var metadata = SerializationMetadata_1.default.getOrCreateForProto(target);
        metadata.fields[propertyKey] = new SerializationMetadata_1.FieldMetadata(serializer);
    };
}
exports.default = serializable;
var Direction;
(function (Direction) {
    Direction[Direction["Both"] = 0] = "Both";
    Direction[Direction["OnlySerialize"] = 1] = "OnlySerialize";
    Direction[Direction["OnlyDeserialize"] = 2] = "OnlyDeserialize";
})(Direction = exports.Direction || (exports.Direction = {}));
//# sourceMappingURL=serializable.js.map