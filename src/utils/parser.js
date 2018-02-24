"use strict";

const loValues = require("lodash/values");
const moment = require("moment");
const detector = require("./detector");
const {
  STRING,
  STRING_ONLY,
  ARRAY,
  ARRAY_ONLY,
  BOOLEAN,
  BOOLEAN_ONLY,
  DATE,
  DATE_ONLY,
  FUNCTION,
  FUNCTION_ONLY,
  NUMBER,
  NUMBER_ONLY,
  OBJECT,
  OBJECT_ONLY,
  ANY,
  parserableTypes,
  nonNullableTypes,
  isPredefinedTypes
} = require("../datatypes");

const parser = {
  [STRING]: val => {
    if (detector.isString(val) && val.length) return val;
    const parsed = val ? JSON.stringify(val) : null;
    return detector.isString(parsed) && parsed.length > 0 ? parsed : null;
  },
  [ARRAY]: val => (detector.isArray(val) ? val : null),
  [BOOLEAN]: val => (detector.isBoolean(val) ? val : null),
  [DATE]: val => {
    if (detector.isDate(val)) return val;
    if (detector.isString(val)) {
      // detect ISO 8601
      const date = moment(val);
      if (date.isValid()) return date;
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

const nonNullableChecker = {
  [STRING_ONLY]: val => detector.isString(val),
  [ARRAY_ONLY]: val => detector.isArray(val),
  [BOOLEAN_ONLY]: val => detector.isBoolean(val),
  [DATE_ONLY]: val => detector.isDate(val),
  [FUNCTION_ONLY]: val => detector.isFunction(val),
  [NUMBER_ONLY]: val => {
    if (!isNaN(val)) {
      return detector.isStringFloat(val) ? parseFloat(val) : parseInt(val);
    }

    return false;
  },
  [OBJECT_ONLY]: val => detector.isObject(val)
};

const nonNullableParser = {
  [STRING_ONLY]: val => parser[STRING](val),
  [ARRAY_ONLY]: val => parser[ARRAY](val),
  [BOOLEAN_ONLY]: val => parser[BOOLEAN](val),
  [DATE_ONLY]: val => parser[DATE](val),
  [FUNCTION_ONLY]: val => parser[FUNCTION](val),
  [NUMBER_ONLY]: val => parser[NUMBER](val),
  [OBJECT_ONLY]: val => parser[OBJECT](val)
};

const valueParser = (schema, valuesToParse) => {
  const parsedValues = {};
  Object.keys(schema).forEach(key => {
    const valueType = schema[key];
    const value = detector.isUndefined(valuesToParse)
      ? detector.isUndefined
      : valuesToParse[key];
    if (!detector.isUndefined(value) || detector.isJKTObject(valueType)) {
      if (parserableTypes(valueType) && !detector.isJKTObject(valueType)) {
        parsedValues[key] = parser[valueType](value);
      } else if (detector.isJKTObject(valueType)) {
        // handle jkt obj
        parsedValues[key] = valueParser(valueType.__schema, value);
      } else if (detector.isENUMObject(valueType)) {
        // handle enum
        const validEnumValues = loValues(valueType.j());
        parsedValues[key] = validEnumValues.includes(value) ? value : null;
      } else if (detector.isTranslatorObject(valueType)) {
        // handle translator
        parsedValues[key] = valueType.translate(value);
      } else if (nonNullableTypes(valueType)) {
        if (nonNullableChecker[valueType](value))
          parsedValues[key] = nonNullableParser[valueType](value);
      } else if (valueType.isContainer) {
        // struct inside of container
        parsedValues[key] = valueType.parse(valueParser, value);
      } else {
        parsedValues[key] = value;
      }
    } else if (!parserableTypes(valueType) && isPredefinedTypes(valueType)) {
      // Do not parse enum value
      if (!detector.isENUMObject(valueType)) {
        // the predefined type is container type
        // so we put value handled with its container here
        if (valueType.isContainer) {
          parsedValues[key] = valueType.parse(valueParser, value);
        } else {
          // custom defined values from the begining of struct creation
          parsedValues[key] = valueType;
        }
      }
    } else {
      // Value was undefined or not matched with available schema
      if (!nonNullableTypes(valueType)) parsedValues[key] = null;
    }
  });
  return parsedValues;
};

const parse = baseSchema => {
  return valuesToParse => valueParser(baseSchema, valuesToParse);
};

module.exports = parse;
module.exports.valueParser = valueParser;
