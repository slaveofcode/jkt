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
  [DATE]: val => (val ? val.toJSON() : null), // ISO-8601 UTC
  [BOOLEAN]: val => val
};

const purified = obj => {
  try {
    const parsed = JSON.parse(JSON.stringify(obj));
    return parsed;
  } catch (err) {
    return undefined;
  }
};

const serialize = baseSchema => {
  return parsedValues => {
    const serializedValues = {};
    Object.keys(baseSchema).forEach(key => {
      const valueType = baseSchema[key];
      const value = parsedValues[key];
      if (!detector.isUndefined(value))
        if (isSafeToRelease(valueType)) {
          serializedValues[key] = serializer[valueType](value);
        } else {
          const purifiedVal = purified(value);
          if (!detector.isUndefined(purifiedVal))
            serializedValues[key] = purifiedVal;
        }
    });
    return serializedValues;
  };
};

module.exports = serialize;
