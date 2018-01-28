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

const comparator = comp => {
  return obj => Object.prototype.toString.call(obj) === comp;
};

const isArray = comparator(ARRAY_V);
const isObject = comparator(OBJECT_V);
const isFunction = comparator(FUNC_V);
const isString = comparator(STRING_V);
const isNumber = comparator(NUMBER_V);
const isBoolean = comparator(BOOL_V);
const isNull = comparator(NULL_V);
const isDate = comparator(DATE_V);
const isUndefined = comparator(UNDEF_V);

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
