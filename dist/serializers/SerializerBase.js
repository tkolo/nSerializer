"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
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
    __extends(ContextlessSerializerBase, _super);
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
