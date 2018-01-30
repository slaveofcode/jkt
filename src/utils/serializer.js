"use strict";

const detector = require("./detector");
const {
  STRING,
  ARRAY,
  BOOLEAN,
  DATE,
  FUNCTION,
  NUMBER,
  OBJECT,
  ANY
} = require("../datatypes");

const isSafeToRelease = typeName =>
  [STRING, NUMBER, DATE, BOOLEAN].includes(typeName);

const serializer = {
  [STRING]: val => val,
  [NUMBER]: val => val,
  [DATE]: val => val.toJSON(), // ISO-8601 UTC
  [BOOLEAN]: val => val
};

const purifier = obj => JSON.parse(JSON.stringify(obj));

const serialize = baseSchema => {
  return parsedValues => {
    const serializedValues = {};
    Object.keys(baseSchema).forEach(key => {
      const valueType = baseSchema[key];
      const value = parsedValues[key];
      if (!detector.isUndefined(value))
        serializedValues[key] = isSafeToRelease(valueType)
          ? serializer(valueType)(value)
          : purifier(value);
    });
    return serializedValues;
  };
};

module.exports = serialize;
