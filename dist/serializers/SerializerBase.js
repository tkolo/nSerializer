"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var NEXT_SERIALIZER_ID = 0;
var SerializerBase = (function () {
    function SerializerBase() {
        this.serializerId = NEXT_SERIALIZER_ID++;
    }
    SerializerBase.prototype.getSerializerId = function () {
        return 0;
    };
    return SerializerBase;
}());
exports.SerializerBase = SerializerBase;
var ContextlessSerializerBase = (function (_super) {
    tslib_1.__extends(ContextlessSerializerBase, _super);
    function ContextlessSerializerBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextlessSerializerBase.prototype.createDeserializationSubContext = function () {
    };
    ContextlessSerializerBase.prototype.createSerializationSubContext = function () {
    };
    return ContextlessSerializerBase;
}(SerializerBase));
exports.ContextlessSerializerBase = ContextlessSerializerBase;
//# sourceMappingURL=SerializerBase.js.map