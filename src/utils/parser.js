"use strict";
const moment = require("moment");
const detector = require("./detector");
const {
  STRING,
  ARRAY,
  BOOLEAN,
  DATE,
  FUNCTION,
  NUMBER,
  OBJECT,
  ANY,
  parserableTypes
} = require("../datatypes");

const parser = {
  [STRING]: val => {
    if (detector.isString(val)) return val;
    return JSON.stringify(val);
  },
  [ARRAY]: val => (detector.isArray(val) ? val : []),
  [BOOLEAN]: val => (detector.isBoolean(val) ? val : null),
  [DATE]: val => {
    if (detector.isDate(val)) return val;
    if (detector.isString(val)) {
      // detect ISO 8601
      const date = moment(val);
      if (data.isValid()) return date;
    }
    return null;
  },
  [FUNCTION]: val => (detector.isFunction(val) ? val : null),
  [NUMBER]: val => {
    if (detector.isNumber(val)) return val;
    if (!isNaN(val)) {
      return detector.isStringFloat(val) ? parseFloat(val) : parseInt(val);
    }
    return null;
  },
  [OBJECT]: val => (detector.isObject ? val : null),
  [ANY]: val => val
};

const isPredefinedTypes = valueType =>
  detector.isFunction(valueType) ||
  detector.isArray(valueType) ||
  detector.isObject(valueType) ||
  detector.isBoolean(valueType) ||
  detector.isDate(valueType) ||
  detector.isError(valueType) ||
  detector.isNull(valueType) ||
  detector.isNumber(valueType) ||
  detector.isString(valueType);

const parse = baseSchema => {
  return valuesToParse => {
    const parsedValues = {};
    Object.keys(baseSchema).forEach(key => {
      const valueType = baseSchema[key];
      const value = valuesToParse[key];
      if (!detector.isUndefined(value))
        parsedValues[key] = parserableTypes(valueType)
          ? parser[valueType](value)
          : value;
      else if (!parserableTypes(valueType) && isPredefinedTypes(valueType))
        parsedValues[key] = valueType;
    });
    return parsedValues;
  };
};

module.exports = parse;
