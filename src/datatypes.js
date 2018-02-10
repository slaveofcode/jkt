"use strict";

const {
  isString,
  isNumber,
  isDate,
  isStringFloat,
  isUndefined
} = require("./utils/detector");

const STRING = "String";
const STRING_ONLY = `${STRING}!`;
const NUMBER = "Number";
const NUMBER_ONLY = `${NUMBER}!`;
const DATE = "Date";
const DATE_ONLY = `${DATE}!`;
const BOOLEAN = "Boolean";
const BOOLEAN_ONLY = `${BOOLEAN}!`;
const OBJECT = "Object";
const OBJECT_ONLY = `${OBJECT}!`;
const ARRAY = "Array";
const ARRAY_ONLY = `${ARRAY}!`;
const FUNCTION = "Function";
const FUNCTION_ONLY = `${FUNCTION}!`;
const ANY = "Any";

const parserableTypes = typeName =>
  [STRING, ARRAY, BOOLEAN, DATE, FUNCTION, NUMBER, OBJECT, ANY].includes(
    typeName
  );

const nonNullableTypes = typeName =>
  [
    STRING_ONLY,
    ARRAY_ONLY,
    BOOLEAN_ONLY,
    DATE_ONLY,
    FUNCTION_ONLY,
    NUMBER_ONLY,
    OBJECT_ONLY
  ].includes(typeName);

const isDeleteProperty = value => /\s*\!DELETE\s*/g.test(value);

module.exports = {
  STRING,
  STRING_ONLY,
  NUMBER,
  NUMBER_ONLY,
  DATE,
  DATE_ONLY,
  BOOLEAN,
  BOOLEAN_ONLY,
  OBJECT,
  OBJECT_ONLY,
  ARRAY,
  ARRAY_ONLY,
  FUNCTION,
  FUNCTION_ONLY,
  ANY,
  parserableTypes,
  nonNullableTypes,
  isDeleteProperty
};
