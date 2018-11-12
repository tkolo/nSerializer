"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var SerializerBase_1 = require("./SerializerBase");
var ListSerializer = (function (_super) {
    tslib_1.__extends(ListSerializer, _super);
    function ListSerializer(innerSerializer) {
        var _this = _super.call(this) || this;
        _this.innerSerializer = innerSerializer;
        return _this;
    }
    ListSerializer.prototype.serialize = function (argument, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promises, _i, argument_1, val;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!argument) {
                            return [2];
                        }
                        promises = [];
                        for (_i = 0, argument_1 = argument; _i < argument_1.length; _i++) {
                            val = argument_1[_i];
                            promises.push(this.innerSerializer.serialize(val, context));
                        }
                        return [4, Promise.all(promises)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    ListSerializer.prototype.deserialize = function (argument, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var promises, _i, argument_2, val;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!argument) {
                            return [2];
                        }
                        promises = [];
                        for (_i = 0, argument_2 = argument; _i < argument_2.length; _i++) {
                            val = argument_2[_i];
                            promises.push(this.innerSerializer.deserialize(val, context));
                        }
                        return [4, Promise.all(promises)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return ListSerializer;
}(SerializerBase_1.ContextlessSerializerBase));
exports.ListSerializer = ListSerializer;
function list(innerSerializer) {
    return new ListSerializer(innerSerializer);
}
exports.default = list;
//# sourceMappingURL=ListSerializer.js.map