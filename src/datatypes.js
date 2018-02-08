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
  [
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
    ANY
  ].includes(typeName);

const isEnum = value =>
  /ENUM\[(((\s*([A-Za-z0-9\_]+)\s*)\:?(\s*([A-Za-z0-9\s]+)\s*)?)\s*\,*\s*)+\]/g.test(
    value
  );

const isSafeEnumValue = val => isString(val) || isNumber(val);

const makeEnum = enumSchema => {
  const enums = {};
  // cleaning ENUM[] char, leaving values separated by comma
  const cleaned = enumSchema
    .replace(/ENUM\[/g, "")
    .replace(/\]/g, "")
    .replace(/\r?\n|\r/g, " ");
  const constList = cleaned.split(",");

  constList.forEach(keyVal => {
    const trimmed = keyVal.trim();
    const [key, val] = trimmed.split(":");
    const keyUnderscored = key.toUpperCase().replace(/\s/g, "_");
    if (isSafeEnumValue(val)) {
      // parse enum with provided value
      enums[keyUnderscored] = !isNaN(val)
        ? isStringFloat(val) ? parseFloat(val) : parseInt(val)
        : val.length > 0 ? val : keyUnderscored;
    } else {
      // parse enum with value same as the key
      enums[keyUnderscored] = keyUnderscored;
    }
  });
  return enums;
};

const isDeleteProperty = value => /\s*\!DELETE\s*/g.test(value);

module.exports = {
  STRING,
  NUMBER,
  DATE,
  BOOLEAN,
  OBJECT,
  ARRAY,
  FUNCTION,
  ANY,
  parserableTypes,
  isEnum,
  makeEnum,
  isDeleteProperty
};
