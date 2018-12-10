"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Serializer_1 = require("../core/Serializer");
var SerializerBase_1 = require("./SerializerBase");
var serializable_1 = require("../core/serializable");
var ContextBase_1 = require("../core/context/ContextBase");
var ObjectSerializationContext = (function () {
    function ObjectSerializationContext() {
        this._objects = [];
        this._dtos = [];
    }
    ObjectSerializationContext.prototype.addAndAssignId = function (obj, dto) {
        var id = this._objects.push(obj);
        this._dtos.push(dto);
        return id;
    };
    ObjectSerializationContext.prototype.getDtoForId = function (index) {
        return this._dtos[index - 1];
    };
    ObjectSerializationContext.prototype.getIdFor = function (obj) {
        return this._objects.indexOf(obj) + 1;
    };
    return ObjectSerializationContext;
}());
var ObjectDeserializationContext = (function () {
    function ObjectDeserializationContext() {
        this._objects = {};
        this._listeners = [];
    }
    ObjectDeserializationContext.prototype.getObjectForId = function (id) {
        return this._objects[id];
    };
    ObjectDeserializationContext.prototype.addObjectForId = function (id, obj) {
        this._objects[id] = obj;
        this.triggerOnObjectAdded(id, obj);
    };
    ObjectDeserializationContext.prototype.onObjectAddedAdd = function (listener) {
        this._listeners.push(listener);
    };
    ObjectDeserializationContext.prototype.onObjectAddedRemove = function (listener) {
        var index = this._listeners.indexOf(listener);
        if (index !== -1) {
            this._listeners.splice(index, 1);
        }
    };
    ObjectDeserializationContext.prototype.triggerOnObjectAdded = function (id, obj) {
        for (var _i = 0, _a = this._listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(id, obj);
        }
    };
    return ObjectDeserializationContext;
}());
var ObjectSerializer = (function (_super) {
    tslib_1.__extends(ObjectSerializer, _super);
    function ObjectSerializer(clsRef) {
        var _this = _super.call(this) || this;
        _this.clsRef = clsRef;
        return _this;
    }
    Object.defineProperty(ObjectSerializer.prototype, "cls", {
        get: function () {
            return this.clsRef();
        },
        enumerable: true,
        configurable: true
    });
    ObjectSerializer.prototype.createDeserializationSubContext = function () {
        return new ObjectDeserializationContext();
    };
    ObjectSerializer.prototype.createSerializationSubContext = function () {
        return new ObjectSerializationContext();
    };
    ObjectSerializer.prototype.serialize = function (argument, context) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var subContext, id, dto, metadata, promises, metaKey, fieldMeta, _a, _b, _i, key, value, serializer, _c, _d, _e, _f, _g, key, _h, _j, referencedDto;
            return tslib_1.__generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        if (!argument) {
                            return [2, null];
                        }
                        subContext = context.getSubContext(this);
                        id = subContext.getIdFor(argument);
                        if (!!id) return [3, 9];
                        dto = {};
                        metadata = argument[serializable_1.METADATA_FIELD];
                        subContext.addAndAssignId(argument, dto);
                        promises = {};
                        if (metadata) {
                            for (metaKey in metadata.fields) {
                                if (metadata.fields.hasOwnProperty(metaKey)) {
                                    fieldMeta = metadata.fields[metaKey];
                                    promises[metaKey] = fieldMeta.serializer.serialize(argument[metaKey], context);
                                }
                            }
                        }
                        if (!context.allowDynamic) return [3, 4];
                        _a = [];
                        for (_b in argument)
                            _a.push(_b);
                        _i = 0;
                        _k.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        key = _a[_i];
                        value = argument[key];
                        serializer = Serializer_1.guessSerializer(value, (value && value.constructor) || Object);
                        _c = promises;
                        _d = key;
                        return [4, serializer.serialize(value, context)];
                    case 2:
                        _c[_d] = _k.sent();
                        _k.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        _e = [];
                        for (_f in promises)
                            _e.push(_f);
                        _g = 0;
                        _k.label = 5;
                    case 5:
                        if (!(_g < _e.length)) return [3, 8];
                        key = _e[_g];
                        if (!promises.hasOwnProperty(key)) return [3, 7];
                        _h = dto;
                        _j = key;
                        return [4, promises[key]];
                    case 6:
                        _h[_j] = _k.sent();
                        _k.label = 7;
                    case 7:
                        _g++;
                        return [3, 5];
                    case 8: return [2, dto];
                    case 9:
                        switch (context.referenceBehavior) {
                            case ContextBase_1.ReferenceBehavior.Error:
                                throw new Error("Cyclic reference detected for object " + argument);
                            case ContextBase_1.ReferenceBehavior.Ignore:
                                return [2, undefined];
                            case ContextBase_1.ReferenceBehavior.Serialize:
                                referencedDto = subContext.getDtoForId(id);
                                referencedDto.$id = id.toString();
                                return [2, {
                                        $ref: id.toString()
                                    }];
                        }
                        _k.label = 10;
                    case 10: return [2];
                }
            });
        });
    };
    ObjectSerializer.createInstance = function (cls) {
        var a = function () {
        };
        a.prototype = cls.prototype;
        return new a();
    };
    ObjectSerializer.prototype.deserialize = function (argument, context) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var subContext, id_1, object_1, metadata, obj, promises, metaKey, fieldMeta, childContext, _a, _b, _i, key, _c, _d;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!argument) {
                            resolve();
                            return [2];
                        }
                        subContext = context.getSubContext(this);
                        if (!argument.$ref) return [3, 1];
                        switch (context.referenceBehavior) {
                            case ContextBase_1.ReferenceBehavior.Error:
                                throw new Error('$ref encountered, but ref deserialization is set to Error');
                            case ContextBase_1.ReferenceBehavior.Ignore:
                                resolve();
                                return [2];
                            case ContextBase_1.ReferenceBehavior.Serialize:
                                id_1 = argument.$ref;
                                object_1 = subContext.getObjectForId(id_1);
                                if (!object_1) {
                                    subContext.onObjectAddedAdd(function (contextId, obj) {
                                        if (contextId === id_1)
                                            resolve(obj);
                                    });
                                }
                                else {
                                    resolve(object_1);
                                    return [2];
                                }
                                break;
                        }
                        return [3, 9];
                    case 1:
                        metadata = this.cls.prototype[serializable_1.METADATA_FIELD];
                        obj = context.obj;
                        if (!!obj) return [3, 4];
                        if (!metadata.converter) return [3, 3];
                        return [4, metadata.converter(argument, context)];
                    case 2:
                        obj = _e.sent();
                        return [3, 4];
                    case 3:
                        obj = ObjectSerializer.createInstance(this.cls);
                        _e.label = 4;
                    case 4:
                        if (argument.$id) {
                            subContext.addObjectForId(argument.$id, obj);
                        }
                        promises = {};
                        if (metadata) {
                            for (metaKey in metadata.fields) {
                                if (metadata.fields.hasOwnProperty(metaKey)) {
                                    if (!(metaKey in argument))
                                        continue;
                                    fieldMeta = metadata.fields[metaKey];
                                    childContext = context.createChildContext(obj[metaKey]);
                                    promises[metaKey] = fieldMeta.serializer.deserialize(argument[metaKey], childContext);
                                }
                            }
                        }
                        _a = [];
                        for (_b in promises)
                            _a.push(_b);
                        _i = 0;
                        _e.label = 5;
                    case 5:
                        if (!(_i < _a.length)) return [3, 8];
                        key = _a[_i];
                        if (!promises.hasOwnProperty(key)) return [3, 7];
                        _c = obj;
                        _d = key;
                        return [4, promises[key]];
                    case 6:
                        _c[_d] = _e.sent();
                        _e.label = 7;
                    case 7:
                        _i++;
                        return [3, 5];
                    case 8:
                        resolve(obj);
                        return [2];
                    case 9: return [2];
                }
            });
        }); });
    };
    return ObjectSerializer;
}(SerializerBase_1.SerializerBase));
exports.ObjectSerializer = ObjectSerializer;
function object(clsRef) {
    return new ObjectSerializer(clsRef);
}
exports.default = object;
//# sourceMappingURL=ObjectSerializer.js.map