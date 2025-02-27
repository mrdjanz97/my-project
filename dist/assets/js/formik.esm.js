import { r as reactExports } from "./client.js";
import { g as getDefaultExportFromCjs } from "./_commonjsHelpers.js";
var isMergeableObject = function isMergeableObject2(value) {
  return isNonNullObject(value) && !isSpecial(value);
};
function isNonNullObject(value) {
  return !!value && typeof value === "object";
}
function isSpecial(value) {
  var stringValue = Object.prototype.toString.call(value);
  return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
}
var canUseSymbol = typeof Symbol === "function" && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
function isReactElement(value) {
  return value.$$typeof === REACT_ELEMENT_TYPE;
}
function emptyTarget(val) {
  return Array.isArray(val) ? [] : {};
}
function cloneUnlessOtherwiseSpecified(value, options) {
  return options.clone !== false && options.isMergeableObject(value) ? deepmerge(emptyTarget(value), value, options) : value;
}
function defaultArrayMerge(target, source, options) {
  return target.concat(source).map(function(element) {
    return cloneUnlessOtherwiseSpecified(element, options);
  });
}
function mergeObject(target, source, options) {
  var destination = {};
  if (options.isMergeableObject(target)) {
    Object.keys(target).forEach(function(key) {
      destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
    });
  }
  Object.keys(source).forEach(function(key) {
    if (!options.isMergeableObject(source[key]) || !target[key]) {
      destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
    } else {
      destination[key] = deepmerge(target[key], source[key], options);
    }
  });
  return destination;
}
function deepmerge(target, source, options) {
  options = options || {};
  options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  options.isMergeableObject = options.isMergeableObject || isMergeableObject;
  var sourceIsArray = Array.isArray(source);
  var targetIsArray = Array.isArray(target);
  var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
  if (!sourceAndTargetTypesMatch) {
    return cloneUnlessOtherwiseSpecified(source, options);
  } else if (sourceIsArray) {
    return options.arrayMerge(target, source, options);
  } else {
    return mergeObject(target, source, options);
  }
}
deepmerge.all = function deepmergeAll(array, options) {
  if (!Array.isArray(array)) {
    throw new Error("first argument should be an array");
  }
  return array.reduce(function(prev, next) {
    return deepmerge(prev, next, options);
  }, {});
};
var deepmerge_1 = deepmerge;
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$d = Object.prototype;
var hasOwnProperty$a = objectProto$d.hasOwnProperty;
var nativeObjectToString$1 = objectProto$d.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$a.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$c = Object.prototype;
var nativeObjectToString = objectProto$c.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var objectTag$3 = "[object Object]";
var funcProto$2 = Function.prototype, objectProto$b = Object.prototype;
var funcToString$2 = funcProto$2.toString;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
var objectCtorString = funcToString$2.call(Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) {
    return false;
  }
  var proto = getPrototype$1(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$9.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString$2.call(Ctor) == objectCtorString;
}
var isArray$2 = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;
var hasElementType = typeof Element !== "undefined";
function equal(a, b2) {
  if (a === b2)
    return true;
  if (a && b2 && typeof a == "object" && typeof b2 == "object") {
    var arrA = isArray$2(a), arrB = isArray$2(b2), i, length, key;
    if (arrA && arrB) {
      length = a.length;
      if (length != b2.length)
        return false;
      for (i = length; i-- !== 0; )
        if (!equal(a[i], b2[i]))
          return false;
      return true;
    }
    if (arrA != arrB)
      return false;
    var dateA = a instanceof Date, dateB = b2 instanceof Date;
    if (dateA != dateB)
      return false;
    if (dateA && dateB)
      return a.getTime() == b2.getTime();
    var regexpA = a instanceof RegExp, regexpB = b2 instanceof RegExp;
    if (regexpA != regexpB)
      return false;
    if (regexpA && regexpB)
      return a.toString() == b2.toString();
    var keys2 = keyList(a);
    length = keys2.length;
    if (length !== keyList(b2).length)
      return false;
    for (i = length; i-- !== 0; )
      if (!hasProp.call(b2, keys2[i]))
        return false;
    if (hasElementType && a instanceof Element && b2 instanceof Element)
      return a === b2;
    for (i = length; i-- !== 0; ) {
      key = keys2[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      } else {
        if (!equal(a[key], b2[key]))
          return false;
      }
    }
    return true;
  }
  return a !== a && b2 !== b2;
}
var reactFastCompare = function exportedEqual(a, b2) {
  try {
    return equal(a, b2);
  } catch (error) {
    if (error.message && error.message.match(/stack|recursion/i) || error.number === -2146828260) {
      console.warn("Warning: react-fast-compare does not handle circular references.", error.name, error.message);
      return false;
    }
    throw error;
  }
};
const isEqual = /* @__PURE__ */ getDefaultExportFromCjs(reactFastCompare);
var isProduction = true;
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }
    var text = "Warning: " + message;
    if (typeof console !== "undefined") {
      console.warn(text);
    }
    try {
      throw Error(text);
    } catch (x2) {
    }
  }
}
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
function isObject$1(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$1(value) {
  if (!isObject$1(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e2) {
    }
    try {
      return func + "";
    } catch (e2) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$a = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$8).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject$1(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var Map = getNative(root$1, "Map");
const Map$1 = Map;
var nativeCreate = getNative(Object, "create");
const nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$7.call(data, key) ? data[key] : void 0;
}
var objectProto$8 = Object.prototype;
var hasOwnProperty$6 = objectProto$8.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$6.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var defineProperty$1 = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e2) {
  }
}();
const defineProperty$2 = defineProperty$1;
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty$2) {
    defineProperty$2(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var objectProto$7 = Object.prototype;
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$5.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
function baseTimes(n2, iteratee) {
  var index = -1, result = Array(n2);
  while (++index < n2) {
    result[index] = iteratee(index);
  }
  return result;
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var objectProto$6 = Object.prototype;
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;
var isArguments = baseIsArguments(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$4.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
const isArguments$1 = isArguments;
var isArray = Array.isArray;
const isArray$1 = isArray;
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e2) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$5 = Object.prototype;
var hasOwnProperty$3 = objectProto$5.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$3.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$4 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$4;
  return value === proto;
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$2.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction$1(value);
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$2 = Object.prototype;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject$1(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$1.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer ? Buffer.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$1 = Object.prototype;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
const getSymbols$1 = getSymbols;
function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}
function arrayPush(array, values) {
  var index = -1, length = values.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};
const getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}
var DataView = getNative(root$1, "DataView");
const DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set = getNative(root$1, "Set");
const Set$1 = Set;
var WeakMap$1 = getNative(root$1, "WeakMap");
const WeakMap$2 = WeakMap$1;
var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$2);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2 || Map$1 && getTag(new Map$1()) != mapTag$3 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$3 || WeakMap$2 && getTag(new WeakMap$2()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array = root$1.Uint8Array;
const Uint8Array$1 = Uint8Array;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$2 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$2:
      return cloneSymbol(object);
  }
}
var objectCreate = Object.create;
var baseCreate = /* @__PURE__ */ function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$1(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
const baseCreate$1 = baseCreate;
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
}
var mapTag$1 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$1;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
const isMap$1 = isMap;
var setTag$1 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
const isSet$1 = isSet;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$2 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag$1 = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag$1] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$2;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject$1(value)) {
    return value;
  }
  var isArr = isArray$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var CLONE_SYMBOLS_FLAG$1 = 4;
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG$1);
}
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}
memoize.Cache = MapCache;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
const stringToPath$1 = stringToPath;
var INFINITY$1 = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
var INFINITY = 1 / 0;
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$1(value)) {
    return arrayMap(value, baseToString) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function toPath(value) {
  if (isArray$1(value)) {
    return arrayMap(value, toKey);
  }
  return isSymbol(value) ? [value] : copyArray(stringToPath$1(toString(value)));
}
var reactIs$1 = { exports: {} };
var reactIs_production_min = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = "function" === typeof Symbol && Symbol.for, c = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x = b ? Symbol.for("react.responder") : 60118, y = b ? Symbol.for("react.scope") : 60119;
function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;
    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;
              default:
                return u;
            }
        }
      case d:
        return u;
    }
  }
}
function A(a) {
  return z(a) === m;
}
reactIs_production_min.AsyncMode = l;
reactIs_production_min.ConcurrentMode = m;
reactIs_production_min.ContextConsumer = k;
reactIs_production_min.ContextProvider = h;
reactIs_production_min.Element = c;
reactIs_production_min.ForwardRef = n;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t;
reactIs_production_min.Memo = r;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g;
reactIs_production_min.StrictMode = f;
reactIs_production_min.Suspense = p;
reactIs_production_min.isAsyncMode = function(a) {
  return A(a) || z(a) === l;
};
reactIs_production_min.isConcurrentMode = A;
reactIs_production_min.isContextConsumer = function(a) {
  return z(a) === k;
};
reactIs_production_min.isContextProvider = function(a) {
  return z(a) === h;
};
reactIs_production_min.isElement = function(a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};
reactIs_production_min.isForwardRef = function(a) {
  return z(a) === n;
};
reactIs_production_min.isFragment = function(a) {
  return z(a) === e;
};
reactIs_production_min.isLazy = function(a) {
  return z(a) === t;
};
reactIs_production_min.isMemo = function(a) {
  return z(a) === r;
};
reactIs_production_min.isPortal = function(a) {
  return z(a) === d;
};
reactIs_production_min.isProfiler = function(a) {
  return z(a) === g;
};
reactIs_production_min.isStrictMode = function(a) {
  return z(a) === f;
};
reactIs_production_min.isSuspense = function(a) {
  return z(a) === p;
};
reactIs_production_min.isValidElementType = function(a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};
reactIs_production_min.typeOf = z;
{
  reactIs$1.exports = reactIs_production_min;
}
var reactIsExports = reactIs$1.exports;
var reactIs = reactIsExports;
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  "$$typeof": true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  "$$typeof": true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
function getStatics(component) {
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  }
  return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== "string") {
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }
    var keys2 = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys2 = keys2.concat(getOwnPropertySymbols(sourceComponent));
    }
    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);
    for (var i = 0; i < keys2.length; ++i) {
      var key = keys2[i];
      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          defineProperty(targetComponent, key, descriptor);
        } catch (e2) {
        }
      }
    }
  }
  return targetComponent;
}
var hoistNonReactStatics_cjs = hoistNonReactStatics;
const hoistNonReactStatics$1 = /* @__PURE__ */ getDefaultExportFromCjs(hoistNonReactStatics_cjs);
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
var FormikContext = /* @__PURE__ */ reactExports.createContext(void 0);
FormikContext.displayName = "FormikContext";
var FormikProvider = FormikContext.Provider;
var FormikConsumer = FormikContext.Consumer;
function useFormikContext() {
  var formik = reactExports.useContext(FormikContext);
  !!!formik ? warning(false) : void 0;
  return formik;
}
var isEmptyArray = function isEmptyArray2(value) {
  return Array.isArray(value) && value.length === 0;
};
var isFunction = function isFunction2(obj) {
  return typeof obj === "function";
};
var isObject = function isObject2(obj) {
  return obj !== null && typeof obj === "object";
};
var isInteger = function isInteger2(obj) {
  return String(Math.floor(Number(obj))) === obj;
};
var isString = function isString2(obj) {
  return Object.prototype.toString.call(obj) === "[object String]";
};
var isEmptyChildren = function isEmptyChildren2(children) {
  return reactExports.Children.count(children) === 0;
};
var isPromise = function isPromise2(value) {
  return isObject(value) && isFunction(value.then);
};
function getIn(obj, key, def, p2) {
  if (p2 === void 0) {
    p2 = 0;
  }
  var path = toPath(key);
  while (obj && p2 < path.length) {
    obj = obj[path[p2++]];
  }
  if (p2 !== path.length && !obj) {
    return def;
  }
  return obj === void 0 ? def : obj;
}
function setIn(obj, path, value) {
  var res = clone(obj);
  var resVal = res;
  var i = 0;
  var pathArray = toPath(path);
  for (; i < pathArray.length - 1; i++) {
    var currentPath = pathArray[i];
    var currentObj = getIn(obj, pathArray.slice(0, i + 1));
    if (currentObj && (isObject(currentObj) || Array.isArray(currentObj))) {
      resVal = resVal[currentPath] = clone(currentObj);
    } else {
      var nextPath = pathArray[i + 1];
      resVal = resVal[currentPath] = isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
    }
  }
  if ((i === 0 ? obj : resVal)[pathArray[i]] === value) {
    return obj;
  }
  if (value === void 0) {
    delete resVal[pathArray[i]];
  } else {
    resVal[pathArray[i]] = value;
  }
  if (i === 0 && value === void 0) {
    delete res[pathArray[i]];
  }
  return res;
}
function setNestedObjectValues(object, value, visited, response) {
  if (visited === void 0) {
    visited = /* @__PURE__ */ new WeakMap();
  }
  if (response === void 0) {
    response = {};
  }
  for (var _i = 0, _Object$keys = Object.keys(object); _i < _Object$keys.length; _i++) {
    var k2 = _Object$keys[_i];
    var val = object[k2];
    if (isObject(val)) {
      if (!visited.get(val)) {
        visited.set(val, true);
        response[k2] = Array.isArray(val) ? [] : {};
        setNestedObjectValues(val, value, visited, response[k2]);
      }
    } else {
      response[k2] = value;
    }
  }
  return response;
}
function formikReducer(state, msg) {
  switch (msg.type) {
    case "SET_VALUES":
      return _extends({}, state, {
        values: msg.payload
      });
    case "SET_TOUCHED":
      return _extends({}, state, {
        touched: msg.payload
      });
    case "SET_ERRORS":
      if (isEqual(state.errors, msg.payload)) {
        return state;
      }
      return _extends({}, state, {
        errors: msg.payload
      });
    case "SET_STATUS":
      return _extends({}, state, {
        status: msg.payload
      });
    case "SET_ISSUBMITTING":
      return _extends({}, state, {
        isSubmitting: msg.payload
      });
    case "SET_ISVALIDATING":
      return _extends({}, state, {
        isValidating: msg.payload
      });
    case "SET_FIELD_VALUE":
      return _extends({}, state, {
        values: setIn(state.values, msg.payload.field, msg.payload.value)
      });
    case "SET_FIELD_TOUCHED":
      return _extends({}, state, {
        touched: setIn(state.touched, msg.payload.field, msg.payload.value)
      });
    case "SET_FIELD_ERROR":
      return _extends({}, state, {
        errors: setIn(state.errors, msg.payload.field, msg.payload.value)
      });
    case "RESET_FORM":
      return _extends({}, state, msg.payload);
    case "SET_FORMIK_STATE":
      return msg.payload(state);
    case "SUBMIT_ATTEMPT":
      return _extends({}, state, {
        touched: setNestedObjectValues(state.values, true),
        isSubmitting: true,
        submitCount: state.submitCount + 1
      });
    case "SUBMIT_FAILURE":
      return _extends({}, state, {
        isSubmitting: false
      });
    case "SUBMIT_SUCCESS":
      return _extends({}, state, {
        isSubmitting: false
      });
    default:
      return state;
  }
}
var emptyErrors = {};
var emptyTouched = {};
function useFormik(_ref) {
  var _ref$validateOnChange = _ref.validateOnChange, validateOnChange = _ref$validateOnChange === void 0 ? true : _ref$validateOnChange, _ref$validateOnBlur = _ref.validateOnBlur, validateOnBlur = _ref$validateOnBlur === void 0 ? true : _ref$validateOnBlur, _ref$validateOnMount = _ref.validateOnMount, validateOnMount = _ref$validateOnMount === void 0 ? false : _ref$validateOnMount, isInitialValid = _ref.isInitialValid, _ref$enableReinitiali = _ref.enableReinitialize, enableReinitialize = _ref$enableReinitiali === void 0 ? false : _ref$enableReinitiali, onSubmit = _ref.onSubmit, rest = _objectWithoutPropertiesLoose(_ref, ["validateOnChange", "validateOnBlur", "validateOnMount", "isInitialValid", "enableReinitialize", "onSubmit"]);
  var props = _extends({
    validateOnChange,
    validateOnBlur,
    validateOnMount,
    onSubmit
  }, rest);
  var initialValues = reactExports.useRef(props.initialValues);
  var initialErrors = reactExports.useRef(props.initialErrors || emptyErrors);
  var initialTouched = reactExports.useRef(props.initialTouched || emptyTouched);
  var initialStatus = reactExports.useRef(props.initialStatus);
  var isMounted = reactExports.useRef(false);
  var fieldRegistry = reactExports.useRef({});
  reactExports.useEffect(function() {
    isMounted.current = true;
    return function() {
      isMounted.current = false;
    };
  }, []);
  var _React$useState = reactExports.useState(0), setIteration = _React$useState[1];
  var stateRef = reactExports.useRef({
    values: props.initialValues,
    errors: props.initialErrors || emptyErrors,
    touched: props.initialTouched || emptyTouched,
    status: props.initialStatus,
    isSubmitting: false,
    isValidating: false,
    submitCount: 0
  });
  var state = stateRef.current;
  var dispatch = reactExports.useCallback(function(action) {
    var prev = stateRef.current;
    stateRef.current = formikReducer(prev, action);
    if (prev !== stateRef.current)
      setIteration(function(x2) {
        return x2 + 1;
      });
  }, []);
  var runValidateHandler = reactExports.useCallback(function(values, field) {
    return new Promise(function(resolve, reject) {
      var maybePromisedErrors = props.validate(values, field);
      if (maybePromisedErrors == null) {
        resolve(emptyErrors);
      } else if (isPromise(maybePromisedErrors)) {
        maybePromisedErrors.then(function(errors) {
          resolve(errors || emptyErrors);
        }, function(actualException) {
          reject(actualException);
        });
      } else {
        resolve(maybePromisedErrors);
      }
    });
  }, [props.validate]);
  var runValidationSchema = reactExports.useCallback(function(values, field) {
    var validationSchema = props.validationSchema;
    var schema = isFunction(validationSchema) ? validationSchema(field) : validationSchema;
    var promise = field && schema.validateAt ? schema.validateAt(field, values) : validateYupSchema(values, schema);
    return new Promise(function(resolve, reject) {
      promise.then(function() {
        resolve(emptyErrors);
      }, function(err) {
        if (err.name === "ValidationError") {
          resolve(yupToFormErrors(err));
        } else {
          reject(err);
        }
      });
    });
  }, [props.validationSchema]);
  var runSingleFieldLevelValidation = reactExports.useCallback(function(field, value) {
    return new Promise(function(resolve) {
      return resolve(fieldRegistry.current[field].validate(value));
    });
  }, []);
  var runFieldLevelValidations = reactExports.useCallback(function(values) {
    var fieldKeysWithValidation = Object.keys(fieldRegistry.current).filter(function(f2) {
      return isFunction(fieldRegistry.current[f2].validate);
    });
    var fieldValidations = fieldKeysWithValidation.length > 0 ? fieldKeysWithValidation.map(function(f2) {
      return runSingleFieldLevelValidation(f2, getIn(values, f2));
    }) : [Promise.resolve("DO_NOT_DELETE_YOU_WILL_BE_FIRED")];
    return Promise.all(fieldValidations).then(function(fieldErrorsList) {
      return fieldErrorsList.reduce(function(prev, curr, index) {
        if (curr === "DO_NOT_DELETE_YOU_WILL_BE_FIRED") {
          return prev;
        }
        if (curr) {
          prev = setIn(prev, fieldKeysWithValidation[index], curr);
        }
        return prev;
      }, {});
    });
  }, [runSingleFieldLevelValidation]);
  var runAllValidations = reactExports.useCallback(function(values) {
    return Promise.all([runFieldLevelValidations(values), props.validationSchema ? runValidationSchema(values) : {}, props.validate ? runValidateHandler(values) : {}]).then(function(_ref2) {
      var fieldErrors = _ref2[0], schemaErrors = _ref2[1], validateErrors = _ref2[2];
      var combinedErrors = deepmerge_1.all([fieldErrors, schemaErrors, validateErrors], {
        arrayMerge
      });
      return combinedErrors;
    });
  }, [props.validate, props.validationSchema, runFieldLevelValidations, runValidateHandler, runValidationSchema]);
  var validateFormWithHighPriority = useEventCallback(function(values) {
    if (values === void 0) {
      values = state.values;
    }
    dispatch({
      type: "SET_ISVALIDATING",
      payload: true
    });
    return runAllValidations(values).then(function(combinedErrors) {
      if (!!isMounted.current) {
        dispatch({
          type: "SET_ISVALIDATING",
          payload: false
        });
        dispatch({
          type: "SET_ERRORS",
          payload: combinedErrors
        });
      }
      return combinedErrors;
    });
  });
  reactExports.useEffect(function() {
    if (validateOnMount && isMounted.current === true && isEqual(initialValues.current, props.initialValues)) {
      validateFormWithHighPriority(initialValues.current);
    }
  }, [validateOnMount, validateFormWithHighPriority]);
  var resetForm = reactExports.useCallback(function(nextState) {
    var values = nextState && nextState.values ? nextState.values : initialValues.current;
    var errors = nextState && nextState.errors ? nextState.errors : initialErrors.current ? initialErrors.current : props.initialErrors || {};
    var touched = nextState && nextState.touched ? nextState.touched : initialTouched.current ? initialTouched.current : props.initialTouched || {};
    var status = nextState && nextState.status ? nextState.status : initialStatus.current ? initialStatus.current : props.initialStatus;
    initialValues.current = values;
    initialErrors.current = errors;
    initialTouched.current = touched;
    initialStatus.current = status;
    var dispatchFn = function dispatchFn2() {
      dispatch({
        type: "RESET_FORM",
        payload: {
          isSubmitting: !!nextState && !!nextState.isSubmitting,
          errors,
          touched,
          status,
          values,
          isValidating: !!nextState && !!nextState.isValidating,
          submitCount: !!nextState && !!nextState.submitCount && typeof nextState.submitCount === "number" ? nextState.submitCount : 0
        }
      });
    };
    if (props.onReset) {
      var maybePromisedOnReset = props.onReset(state.values, imperativeMethods);
      if (isPromise(maybePromisedOnReset)) {
        maybePromisedOnReset.then(dispatchFn);
      } else {
        dispatchFn();
      }
    } else {
      dispatchFn();
    }
  }, [props.initialErrors, props.initialStatus, props.initialTouched, props.onReset]);
  reactExports.useEffect(function() {
    if (isMounted.current === true && !isEqual(initialValues.current, props.initialValues)) {
      if (enableReinitialize) {
        initialValues.current = props.initialValues;
        resetForm();
        if (validateOnMount) {
          validateFormWithHighPriority(initialValues.current);
        }
      }
    }
  }, [enableReinitialize, props.initialValues, resetForm, validateOnMount, validateFormWithHighPriority]);
  reactExports.useEffect(function() {
    if (enableReinitialize && isMounted.current === true && !isEqual(initialErrors.current, props.initialErrors)) {
      initialErrors.current = props.initialErrors || emptyErrors;
      dispatch({
        type: "SET_ERRORS",
        payload: props.initialErrors || emptyErrors
      });
    }
  }, [enableReinitialize, props.initialErrors]);
  reactExports.useEffect(function() {
    if (enableReinitialize && isMounted.current === true && !isEqual(initialTouched.current, props.initialTouched)) {
      initialTouched.current = props.initialTouched || emptyTouched;
      dispatch({
        type: "SET_TOUCHED",
        payload: props.initialTouched || emptyTouched
      });
    }
  }, [enableReinitialize, props.initialTouched]);
  reactExports.useEffect(function() {
    if (enableReinitialize && isMounted.current === true && !isEqual(initialStatus.current, props.initialStatus)) {
      initialStatus.current = props.initialStatus;
      dispatch({
        type: "SET_STATUS",
        payload: props.initialStatus
      });
    }
  }, [enableReinitialize, props.initialStatus, props.initialTouched]);
  var validateField = useEventCallback(function(name) {
    if (fieldRegistry.current[name] && isFunction(fieldRegistry.current[name].validate)) {
      var value = getIn(state.values, name);
      var maybePromise = fieldRegistry.current[name].validate(value);
      if (isPromise(maybePromise)) {
        dispatch({
          type: "SET_ISVALIDATING",
          payload: true
        });
        return maybePromise.then(function(x2) {
          return x2;
        }).then(function(error) {
          dispatch({
            type: "SET_FIELD_ERROR",
            payload: {
              field: name,
              value: error
            }
          });
          dispatch({
            type: "SET_ISVALIDATING",
            payload: false
          });
        });
      } else {
        dispatch({
          type: "SET_FIELD_ERROR",
          payload: {
            field: name,
            value: maybePromise
          }
        });
        return Promise.resolve(maybePromise);
      }
    } else if (props.validationSchema) {
      dispatch({
        type: "SET_ISVALIDATING",
        payload: true
      });
      return runValidationSchema(state.values, name).then(function(x2) {
        return x2;
      }).then(function(error) {
        dispatch({
          type: "SET_FIELD_ERROR",
          payload: {
            field: name,
            value: getIn(error, name)
          }
        });
        dispatch({
          type: "SET_ISVALIDATING",
          payload: false
        });
      });
    }
    return Promise.resolve();
  });
  var registerField = reactExports.useCallback(function(name, _ref3) {
    var validate = _ref3.validate;
    fieldRegistry.current[name] = {
      validate
    };
  }, []);
  var unregisterField = reactExports.useCallback(function(name) {
    delete fieldRegistry.current[name];
  }, []);
  var setTouched = useEventCallback(function(touched, shouldValidate) {
    dispatch({
      type: "SET_TOUCHED",
      payload: touched
    });
    var willValidate = shouldValidate === void 0 ? validateOnBlur : shouldValidate;
    return willValidate ? validateFormWithHighPriority(state.values) : Promise.resolve();
  });
  var setErrors = reactExports.useCallback(function(errors) {
    dispatch({
      type: "SET_ERRORS",
      payload: errors
    });
  }, []);
  var setValues = useEventCallback(function(values, shouldValidate) {
    var resolvedValues = isFunction(values) ? values(state.values) : values;
    dispatch({
      type: "SET_VALUES",
      payload: resolvedValues
    });
    var willValidate = shouldValidate === void 0 ? validateOnChange : shouldValidate;
    return willValidate ? validateFormWithHighPriority(resolvedValues) : Promise.resolve();
  });
  var setFieldError = reactExports.useCallback(function(field, value) {
    dispatch({
      type: "SET_FIELD_ERROR",
      payload: {
        field,
        value
      }
    });
  }, []);
  var setFieldValue = useEventCallback(function(field, value, shouldValidate) {
    dispatch({
      type: "SET_FIELD_VALUE",
      payload: {
        field,
        value
      }
    });
    var willValidate = shouldValidate === void 0 ? validateOnChange : shouldValidate;
    return willValidate ? validateFormWithHighPriority(setIn(state.values, field, value)) : Promise.resolve();
  });
  var executeChange = reactExports.useCallback(function(eventOrTextValue, maybePath) {
    var field = maybePath;
    var val = eventOrTextValue;
    var parsed;
    if (!isString(eventOrTextValue)) {
      if (eventOrTextValue.persist) {
        eventOrTextValue.persist();
      }
      var target = eventOrTextValue.target ? eventOrTextValue.target : eventOrTextValue.currentTarget;
      var type = target.type, name = target.name, id = target.id, value = target.value, checked = target.checked, outerHTML = target.outerHTML, options = target.options, multiple = target.multiple;
      field = maybePath ? maybePath : name ? name : id;
      if (!field && false) {
        warnAboutMissingIdentifier({
          htmlContent: outerHTML,
          documentationAnchorLink: "handlechange-e-reactchangeeventany--void",
          handlerName: "handleChange"
        });
      }
      val = /number|range/.test(type) ? (parsed = parseFloat(value), isNaN(parsed) ? "" : parsed) : /checkbox/.test(type) ? getValueForCheckbox(getIn(state.values, field), checked, value) : options && multiple ? getSelectedValues(options) : value;
    }
    if (field) {
      setFieldValue(field, val);
    }
  }, [setFieldValue, state.values]);
  var handleChange = useEventCallback(function(eventOrPath) {
    if (isString(eventOrPath)) {
      return function(event) {
        return executeChange(event, eventOrPath);
      };
    } else {
      executeChange(eventOrPath);
    }
  });
  var setFieldTouched = useEventCallback(function(field, touched, shouldValidate) {
    if (touched === void 0) {
      touched = true;
    }
    dispatch({
      type: "SET_FIELD_TOUCHED",
      payload: {
        field,
        value: touched
      }
    });
    var willValidate = shouldValidate === void 0 ? validateOnBlur : shouldValidate;
    return willValidate ? validateFormWithHighPriority(state.values) : Promise.resolve();
  });
  var executeBlur = reactExports.useCallback(function(e2, path) {
    if (e2.persist) {
      e2.persist();
    }
    var _e$target = e2.target, name = _e$target.name, id = _e$target.id, outerHTML = _e$target.outerHTML;
    var field = path ? path : name ? name : id;
    if (!field && false) {
      warnAboutMissingIdentifier({
        htmlContent: outerHTML,
        documentationAnchorLink: "handleblur-e-any--void",
        handlerName: "handleBlur"
      });
    }
    setFieldTouched(field, true);
  }, [setFieldTouched]);
  var handleBlur = useEventCallback(function(eventOrString) {
    if (isString(eventOrString)) {
      return function(event) {
        return executeBlur(event, eventOrString);
      };
    } else {
      executeBlur(eventOrString);
    }
  });
  var setFormikState = reactExports.useCallback(function(stateOrCb) {
    if (isFunction(stateOrCb)) {
      dispatch({
        type: "SET_FORMIK_STATE",
        payload: stateOrCb
      });
    } else {
      dispatch({
        type: "SET_FORMIK_STATE",
        payload: function payload() {
          return stateOrCb;
        }
      });
    }
  }, []);
  var setStatus = reactExports.useCallback(function(status) {
    dispatch({
      type: "SET_STATUS",
      payload: status
    });
  }, []);
  var setSubmitting = reactExports.useCallback(function(isSubmitting) {
    dispatch({
      type: "SET_ISSUBMITTING",
      payload: isSubmitting
    });
  }, []);
  var submitForm = useEventCallback(function() {
    dispatch({
      type: "SUBMIT_ATTEMPT"
    });
    return validateFormWithHighPriority().then(function(combinedErrors) {
      var isInstanceOfError = combinedErrors instanceof Error;
      var isActuallyValid = !isInstanceOfError && Object.keys(combinedErrors).length === 0;
      if (isActuallyValid) {
        var promiseOrUndefined;
        try {
          promiseOrUndefined = executeSubmit();
          if (promiseOrUndefined === void 0) {
            return;
          }
        } catch (error) {
          throw error;
        }
        return Promise.resolve(promiseOrUndefined).then(function(result) {
          if (!!isMounted.current) {
            dispatch({
              type: "SUBMIT_SUCCESS"
            });
          }
          return result;
        })["catch"](function(_errors) {
          if (!!isMounted.current) {
            dispatch({
              type: "SUBMIT_FAILURE"
            });
            throw _errors;
          }
        });
      } else if (!!isMounted.current) {
        dispatch({
          type: "SUBMIT_FAILURE"
        });
        if (isInstanceOfError) {
          throw combinedErrors;
        }
      }
      return;
    });
  });
  var handleSubmit = useEventCallback(function(e2) {
    if (e2 && e2.preventDefault && isFunction(e2.preventDefault)) {
      e2.preventDefault();
    }
    if (e2 && e2.stopPropagation && isFunction(e2.stopPropagation)) {
      e2.stopPropagation();
    }
    submitForm()["catch"](function(reason) {
      console.warn("Warning: An unhandled error was caught from submitForm()", reason);
    });
  });
  var imperativeMethods = {
    resetForm,
    validateForm: validateFormWithHighPriority,
    validateField,
    setErrors,
    setFieldError,
    setFieldTouched,
    setFieldValue,
    setStatus,
    setSubmitting,
    setTouched,
    setValues,
    setFormikState,
    submitForm
  };
  var executeSubmit = useEventCallback(function() {
    return onSubmit(state.values, imperativeMethods);
  });
  var handleReset = useEventCallback(function(e2) {
    if (e2 && e2.preventDefault && isFunction(e2.preventDefault)) {
      e2.preventDefault();
    }
    if (e2 && e2.stopPropagation && isFunction(e2.stopPropagation)) {
      e2.stopPropagation();
    }
    resetForm();
  });
  var getFieldMeta = reactExports.useCallback(function(name) {
    return {
      value: getIn(state.values, name),
      error: getIn(state.errors, name),
      touched: !!getIn(state.touched, name),
      initialValue: getIn(initialValues.current, name),
      initialTouched: !!getIn(initialTouched.current, name),
      initialError: getIn(initialErrors.current, name)
    };
  }, [state.errors, state.touched, state.values]);
  var getFieldHelpers = reactExports.useCallback(function(name) {
    return {
      setValue: function setValue(value, shouldValidate) {
        return setFieldValue(name, value, shouldValidate);
      },
      setTouched: function setTouched2(value, shouldValidate) {
        return setFieldTouched(name, value, shouldValidate);
      },
      setError: function setError(value) {
        return setFieldError(name, value);
      }
    };
  }, [setFieldValue, setFieldTouched, setFieldError]);
  var getFieldProps = reactExports.useCallback(function(nameOrOptions) {
    var isAnObject = isObject(nameOrOptions);
    var name = isAnObject ? nameOrOptions.name : nameOrOptions;
    var valueState = getIn(state.values, name);
    var field = {
      name,
      value: valueState,
      onChange: handleChange,
      onBlur: handleBlur
    };
    if (isAnObject) {
      var type = nameOrOptions.type, valueProp = nameOrOptions.value, is = nameOrOptions.as, multiple = nameOrOptions.multiple;
      if (type === "checkbox") {
        if (valueProp === void 0) {
          field.checked = !!valueState;
        } else {
          field.checked = !!(Array.isArray(valueState) && ~valueState.indexOf(valueProp));
          field.value = valueProp;
        }
      } else if (type === "radio") {
        field.checked = valueState === valueProp;
        field.value = valueProp;
      } else if (is === "select" && multiple) {
        field.value = field.value || [];
        field.multiple = true;
      }
    }
    return field;
  }, [handleBlur, handleChange, state.values]);
  var dirty = reactExports.useMemo(function() {
    return !isEqual(initialValues.current, state.values);
  }, [initialValues.current, state.values]);
  var isValid = reactExports.useMemo(function() {
    return typeof isInitialValid !== "undefined" ? dirty ? state.errors && Object.keys(state.errors).length === 0 : isInitialValid !== false && isFunction(isInitialValid) ? isInitialValid(props) : isInitialValid : state.errors && Object.keys(state.errors).length === 0;
  }, [isInitialValid, dirty, state.errors, props]);
  var ctx = _extends({}, state, {
    initialValues: initialValues.current,
    initialErrors: initialErrors.current,
    initialTouched: initialTouched.current,
    initialStatus: initialStatus.current,
    handleBlur,
    handleChange,
    handleReset,
    handleSubmit,
    resetForm,
    setErrors,
    setFormikState,
    setFieldTouched,
    setFieldValue,
    setFieldError,
    setStatus,
    setSubmitting,
    setTouched,
    setValues,
    submitForm,
    validateForm: validateFormWithHighPriority,
    validateField,
    isValid,
    dirty,
    unregisterField,
    registerField,
    getFieldProps,
    getFieldMeta,
    getFieldHelpers,
    validateOnBlur,
    validateOnChange,
    validateOnMount
  });
  return ctx;
}
function Formik(props) {
  var formikbag = useFormik(props);
  var component = props.component, children = props.children, render = props.render, innerRef = props.innerRef;
  reactExports.useImperativeHandle(innerRef, function() {
    return formikbag;
  });
  return reactExports.createElement(FormikProvider, {
    value: formikbag
  }, component ? reactExports.createElement(component, formikbag) : render ? render(formikbag) : children ? isFunction(children) ? children(formikbag) : !isEmptyChildren(children) ? reactExports.Children.only(children) : null : null);
}
function warnAboutMissingIdentifier(_ref4) {
  var htmlContent = _ref4.htmlContent, documentationAnchorLink = _ref4.documentationAnchorLink, handlerName = _ref4.handlerName;
  console.warn("Warning: Formik called `" + handlerName + "`, but you forgot to pass an `id` or `name` attribute to your input:\n    " + htmlContent + "\n    Formik cannot determine which value to update. For more info see https://formik.org/docs/api/formik#" + documentationAnchorLink + "\n  ");
}
function yupToFormErrors(yupError) {
  var errors = {};
  if (yupError.inner) {
    if (yupError.inner.length === 0) {
      return setIn(errors, yupError.path, yupError.message);
    }
    for (var _iterator = yupError.inner, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
      var _ref5;
      if (_isArray) {
        if (_i >= _iterator.length)
          break;
        _ref5 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done)
          break;
        _ref5 = _i.value;
      }
      var err = _ref5;
      if (!getIn(errors, err.path)) {
        errors = setIn(errors, err.path, err.message);
      }
    }
  }
  return errors;
}
function validateYupSchema(values, schema, sync, context) {
  if (sync === void 0) {
    sync = false;
  }
  var normalizedValues = prepareDataForValidation(values);
  return schema[sync ? "validateSync" : "validate"](normalizedValues, {
    abortEarly: false,
    context: context || normalizedValues
  });
}
function prepareDataForValidation(values) {
  var data = Array.isArray(values) ? [] : {};
  for (var k2 in values) {
    if (Object.prototype.hasOwnProperty.call(values, k2)) {
      var key = String(k2);
      if (Array.isArray(values[key]) === true) {
        data[key] = values[key].map(function(value) {
          if (Array.isArray(value) === true || isPlainObject(value)) {
            return prepareDataForValidation(value);
          } else {
            return value !== "" ? value : void 0;
          }
        });
      } else if (isPlainObject(values[key])) {
        data[key] = prepareDataForValidation(values[key]);
      } else {
        data[key] = values[key] !== "" ? values[key] : void 0;
      }
    }
  }
  return data;
}
function arrayMerge(target, source, options) {
  var destination = target.slice();
  source.forEach(function merge(e2, i) {
    if (typeof destination[i] === "undefined") {
      var cloneRequested = options.clone !== false;
      var shouldClone = cloneRequested && options.isMergeableObject(e2);
      destination[i] = shouldClone ? deepmerge_1(Array.isArray(e2) ? [] : {}, e2, options) : e2;
    } else if (options.isMergeableObject(e2)) {
      destination[i] = deepmerge_1(target[i], e2, options);
    } else if (target.indexOf(e2) === -1) {
      destination.push(e2);
    }
  });
  return destination;
}
function getSelectedValues(options) {
  return Array.from(options).filter(function(el) {
    return el.selected;
  }).map(function(el) {
    return el.value;
  });
}
function getValueForCheckbox(currentValue, checked, valueProp) {
  if (typeof currentValue === "boolean") {
    return Boolean(checked);
  }
  var currentArrayOfValues = [];
  var isValueInArray = false;
  var index = -1;
  if (!Array.isArray(currentValue)) {
    if (!valueProp || valueProp == "true" || valueProp == "false") {
      return Boolean(checked);
    }
  } else {
    currentArrayOfValues = currentValue;
    index = currentValue.indexOf(valueProp);
    isValueInArray = index >= 0;
  }
  if (checked && valueProp && !isValueInArray) {
    return currentArrayOfValues.concat(valueProp);
  }
  if (!isValueInArray) {
    return currentArrayOfValues;
  }
  return currentArrayOfValues.slice(0, index).concat(currentArrayOfValues.slice(index + 1));
}
var useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
function useEventCallback(fn) {
  var ref = reactExports.useRef(fn);
  useIsomorphicLayoutEffect(function() {
    ref.current = fn;
  });
  return reactExports.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return ref.current.apply(void 0, args);
  }, []);
}
function Field(_ref) {
  var validate = _ref.validate, name = _ref.name, render = _ref.render, children = _ref.children, is = _ref.as, component = _ref.component, className = _ref.className, props = _objectWithoutPropertiesLoose(_ref, ["validate", "name", "render", "children", "as", "component", "className"]);
  var _useFormikContext = useFormikContext(), formik = _objectWithoutPropertiesLoose(_useFormikContext, ["validate", "validationSchema"]);
  var registerField = formik.registerField, unregisterField = formik.unregisterField;
  reactExports.useEffect(function() {
    registerField(name, {
      validate
    });
    return function() {
      unregisterField(name);
    };
  }, [registerField, unregisterField, name, validate]);
  var field = formik.getFieldProps(_extends({
    name
  }, props));
  var meta = formik.getFieldMeta(name);
  var legacyBag = {
    field,
    form: formik
  };
  if (render) {
    return render(_extends({}, legacyBag, {
      meta
    }));
  }
  if (isFunction(children)) {
    return children(_extends({}, legacyBag, {
      meta
    }));
  }
  if (component) {
    if (typeof component === "string") {
      var innerRef = props.innerRef, rest = _objectWithoutPropertiesLoose(props, ["innerRef"]);
      return reactExports.createElement(component, _extends({
        ref: innerRef
      }, field, rest, {
        className
      }), children);
    }
    return reactExports.createElement(component, _extends({
      field,
      form: formik
    }, props, {
      className
    }), children);
  }
  var asElement = is || "input";
  if (typeof asElement === "string") {
    var _innerRef = props.innerRef, _rest = _objectWithoutPropertiesLoose(props, ["innerRef"]);
    return reactExports.createElement(asElement, _extends({
      ref: _innerRef
    }, field, _rest, {
      className
    }), children);
  }
  return reactExports.createElement(asElement, _extends({}, field, props, {
    className
  }), children);
}
var Form = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var action = props.action, rest = _objectWithoutPropertiesLoose(props, ["action"]);
  var _action = action != null ? action : "#";
  var _useFormikContext = useFormikContext(), handleReset = _useFormikContext.handleReset, handleSubmit = _useFormikContext.handleSubmit;
  return reactExports.createElement("form", _extends({
    onSubmit: handleSubmit,
    ref,
    onReset: handleReset,
    action: _action
  }, rest));
});
Form.displayName = "Form";
function connect(Comp) {
  var C = function C2(props) {
    return reactExports.createElement(FormikConsumer, null, function(formik) {
      !!!formik ? warning(false) : void 0;
      return reactExports.createElement(Comp, _extends({}, props, {
        formik
      }));
    });
  };
  var componentDisplayName = Comp.displayName || Comp.name || Comp.constructor && Comp.constructor.name || "Component";
  C.WrappedComponent = Comp;
  C.displayName = "FormikConnect(" + componentDisplayName + ")";
  return hoistNonReactStatics$1(
    C,
    Comp
    // cast type to ComponentClass (even if SFC)
  );
}
var move = function move2(array, from, to) {
  var copy = copyArrayLike(array);
  var value = copy[from];
  copy.splice(from, 1);
  copy.splice(to, 0, value);
  return copy;
};
var swap = function swap2(arrayLike, indexA, indexB) {
  var copy = copyArrayLike(arrayLike);
  var a = copy[indexA];
  copy[indexA] = copy[indexB];
  copy[indexB] = a;
  return copy;
};
var insert = function insert2(arrayLike, index, value) {
  var copy = copyArrayLike(arrayLike);
  copy.splice(index, 0, value);
  return copy;
};
var replace = function replace2(arrayLike, index, value) {
  var copy = copyArrayLike(arrayLike);
  copy[index] = value;
  return copy;
};
var copyArrayLike = function copyArrayLike2(arrayLike) {
  if (!arrayLike) {
    return [];
  } else if (Array.isArray(arrayLike)) {
    return [].concat(arrayLike);
  } else {
    var maxIndex = Object.keys(arrayLike).map(function(key) {
      return parseInt(key);
    }).reduce(function(max, el) {
      return el > max ? el : max;
    }, 0);
    return Array.from(_extends({}, arrayLike, {
      length: maxIndex + 1
    }));
  }
};
var createAlterationHandler = function createAlterationHandler2(alteration, defaultFunction) {
  var fn = typeof alteration === "function" ? alteration : defaultFunction;
  return function(data) {
    if (Array.isArray(data) || isObject(data)) {
      var clone2 = copyArrayLike(data);
      return fn(clone2);
    }
    return data;
  };
};
var FieldArrayInner = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(FieldArrayInner2, _React$Component);
  function FieldArrayInner2(props) {
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.updateArrayField = function(fn, alterTouched, alterErrors) {
      var _this$props = _this.props, name = _this$props.name, setFormikState = _this$props.formik.setFormikState;
      setFormikState(function(prevState) {
        var updateErrors = createAlterationHandler(alterErrors, fn);
        var updateTouched = createAlterationHandler(alterTouched, fn);
        var values = setIn(prevState.values, name, fn(getIn(prevState.values, name)));
        var fieldError = alterErrors ? updateErrors(getIn(prevState.errors, name)) : void 0;
        var fieldTouched = alterTouched ? updateTouched(getIn(prevState.touched, name)) : void 0;
        if (isEmptyArray(fieldError)) {
          fieldError = void 0;
        }
        if (isEmptyArray(fieldTouched)) {
          fieldTouched = void 0;
        }
        return _extends({}, prevState, {
          values,
          errors: alterErrors ? setIn(prevState.errors, name, fieldError) : prevState.errors,
          touched: alterTouched ? setIn(prevState.touched, name, fieldTouched) : prevState.touched
        });
      });
    };
    _this.push = function(value) {
      return _this.updateArrayField(function(arrayLike) {
        return [].concat(copyArrayLike(arrayLike), [cloneDeep(value)]);
      }, false, false);
    };
    _this.handlePush = function(value) {
      return function() {
        return _this.push(value);
      };
    };
    _this.swap = function(indexA, indexB) {
      return _this.updateArrayField(function(array) {
        return swap(array, indexA, indexB);
      }, true, true);
    };
    _this.handleSwap = function(indexA, indexB) {
      return function() {
        return _this.swap(indexA, indexB);
      };
    };
    _this.move = function(from, to) {
      return _this.updateArrayField(function(array) {
        return move(array, from, to);
      }, true, true);
    };
    _this.handleMove = function(from, to) {
      return function() {
        return _this.move(from, to);
      };
    };
    _this.insert = function(index, value) {
      return _this.updateArrayField(function(array) {
        return insert(array, index, value);
      }, function(array) {
        return insert(array, index, null);
      }, function(array) {
        return insert(array, index, null);
      });
    };
    _this.handleInsert = function(index, value) {
      return function() {
        return _this.insert(index, value);
      };
    };
    _this.replace = function(index, value) {
      return _this.updateArrayField(function(array) {
        return replace(array, index, value);
      }, false, false);
    };
    _this.handleReplace = function(index, value) {
      return function() {
        return _this.replace(index, value);
      };
    };
    _this.unshift = function(value) {
      var length = -1;
      _this.updateArrayField(function(array) {
        var arr = array ? [value].concat(array) : [value];
        length = arr.length;
        return arr;
      }, function(array) {
        return array ? [null].concat(array) : [null];
      }, function(array) {
        return array ? [null].concat(array) : [null];
      });
      return length;
    };
    _this.handleUnshift = function(value) {
      return function() {
        return _this.unshift(value);
      };
    };
    _this.handleRemove = function(index) {
      return function() {
        return _this.remove(index);
      };
    };
    _this.handlePop = function() {
      return function() {
        return _this.pop();
      };
    };
    _this.remove = _this.remove.bind(_assertThisInitialized(_this));
    _this.pop = _this.pop.bind(_assertThisInitialized(_this));
    return _this;
  }
  var _proto = FieldArrayInner2.prototype;
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.validateOnChange && this.props.formik.validateOnChange && !isEqual(getIn(prevProps.formik.values, prevProps.name), getIn(this.props.formik.values, this.props.name))) {
      this.props.formik.validateForm(this.props.formik.values);
    }
  };
  _proto.remove = function remove(index) {
    var result;
    this.updateArrayField(
      // so this gets call 3 times
      function(array) {
        var copy = array ? copyArrayLike(array) : [];
        if (!result) {
          result = copy[index];
        }
        if (isFunction(copy.splice)) {
          copy.splice(index, 1);
        }
        return isFunction(copy.every) ? copy.every(function(v2) {
          return v2 === void 0;
        }) ? [] : copy : copy;
      },
      true,
      true
    );
    return result;
  };
  _proto.pop = function pop() {
    var result;
    this.updateArrayField(
      // so this gets call 3 times
      function(array) {
        var tmp = array.slice();
        if (!result) {
          result = tmp && tmp.pop && tmp.pop();
        }
        return tmp;
      },
      true,
      true
    );
    return result;
  };
  _proto.render = function render() {
    var arrayHelpers = {
      push: this.push,
      pop: this.pop,
      swap: this.swap,
      move: this.move,
      insert: this.insert,
      replace: this.replace,
      unshift: this.unshift,
      remove: this.remove,
      handlePush: this.handlePush,
      handlePop: this.handlePop,
      handleSwap: this.handleSwap,
      handleMove: this.handleMove,
      handleInsert: this.handleInsert,
      handleReplace: this.handleReplace,
      handleUnshift: this.handleUnshift,
      handleRemove: this.handleRemove
    };
    var _this$props2 = this.props, component = _this$props2.component, render2 = _this$props2.render, children = _this$props2.children, name = _this$props2.name, _this$props2$formik = _this$props2.formik, restOfFormik = _objectWithoutPropertiesLoose(_this$props2$formik, ["validate", "validationSchema"]);
    var props = _extends({}, arrayHelpers, {
      form: restOfFormik,
      name
    });
    return component ? reactExports.createElement(component, props) : render2 ? render2(props) : children ? typeof children === "function" ? children(props) : !isEmptyChildren(children) ? reactExports.Children.only(children) : null : null;
  };
  return FieldArrayInner2;
}(reactExports.Component);
FieldArrayInner.defaultProps = {
  validateOnChange: true
};
var ErrorMessageImpl = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(ErrorMessageImpl2, _React$Component);
  function ErrorMessageImpl2() {
    return _React$Component.apply(this, arguments) || this;
  }
  var _proto = ErrorMessageImpl2.prototype;
  _proto.shouldComponentUpdate = function shouldComponentUpdate(props) {
    if (getIn(this.props.formik.errors, this.props.name) !== getIn(props.formik.errors, this.props.name) || getIn(this.props.formik.touched, this.props.name) !== getIn(props.formik.touched, this.props.name) || Object.keys(this.props).length !== Object.keys(props).length) {
      return true;
    } else {
      return false;
    }
  };
  _proto.render = function render() {
    var _this$props = this.props, component = _this$props.component, formik = _this$props.formik, render2 = _this$props.render, children = _this$props.children, name = _this$props.name, rest = _objectWithoutPropertiesLoose(_this$props, ["component", "formik", "render", "children", "name"]);
    var touch = getIn(formik.touched, name);
    var error = getIn(formik.errors, name);
    return !!touch && !!error ? render2 ? isFunction(render2) ? render2(error) : null : children ? isFunction(children) ? children(error) : null : component ? reactExports.createElement(component, rest, error) : error : null;
  };
  return ErrorMessageImpl2;
}(reactExports.Component);
var ErrorMessage = /* @__PURE__ */ connect(ErrorMessageImpl);
export {
  ErrorMessage as E,
  Formik as F,
  Form as a,
  Field as b
};
//# sourceMappingURL=formik.esm.js.map
