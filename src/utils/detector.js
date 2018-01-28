"use strict";

const ARRAY_V = "[object Array]";
const OBJECT_V = "[object Object]";
const STRING_V = "[object String]";
const FUNC_V = "[object Function]";
const NUMBER_V = "[object Number]";
const BOOL_V = "[object Boolean]";
const NULL_V = "[object Null]";
const DATE_V = "[object Date]";
const UNDEF_V = "[object Undefined]";

const comparator = (obj, comp) => {
  return () => Object.prototype.toString.call(obj) === comp;
};

const isArray = comparator(obj, ARRAY_V);
const isObject = comparator(obj, OBJECT_V);
const isFunction = comparator(obj, FUNC_V);
const isString = comparator(obj, STRING_V);
const isNumber = comparator(obj, NUMBER_V);
const isBoolean = comparator(obj, BOOL_V);
const isNull = comparator(obj, NULL_V);
const isDate = comparator(obj, DATE_V);
const isUndefined = comparator(obj, UNDEF_V);

module.exports = {
  isArray,
  isObject,
  isFunction,
  isString,
  isNumber,
  isBoolean,
  isNull,
  isDate,
  isUndefined
};
