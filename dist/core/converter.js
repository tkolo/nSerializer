"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SerializationMetadata_1 = require("./SerializationMetadata");
function converter(func) {
    return function (target) {
        var metadata = SerializationMetadata_1.default.getOrCreateForProto(target.prototype);
        metadata.converter = func;
    };
}
exports.default = converter;
//# sourceMappingURL=converter.js.map