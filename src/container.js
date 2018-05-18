"use strict";

const loValues = require("lodash/values");
const { isJKTObject, isArray, isNull } = require("./utils/detector");
const utils = require("./utils");
const utilParser = require("./utils/parser");

const baseContainerData = {
  isContainer: true
};

const appendContainerData = f => {
  f.isContainer = true;
  return f;
};

const arrayContainer = (value, strictNull = false, defaultToArray = false) => {
  const parse = (valueParser, valueToParse) => {
    if (isArray(valueToParse)) {
      const parsedValues = [];
      valueToParse.forEach(valueToParse => {
        if (isJKTObject(value)) {
          const p = valueParser(value.__schema, valueToParse);
          let hasNotNullValue = false;
          loValues(p).forEach(v => {
            if (!isNull(v) && v !== undefined) hasNotNullValue = true;
          });
          if (strictNull) {
            if (hasNotNullValue) parsedValues.push(p);
          } else {
            parsedValues.push(p);
          }
        } else {
          parsedValues.push(valueToParse);
        }
      });
      return parsedValues;
    } else {
      return defaultToArray ? [] : null;
    }
  };

  const obj = function(valueToParse) {
    const parsed = parse(utilParser.valueParser, valueToParse);
    const util = utils.makeUtils(value.schema);
    Object.assign(parsed, {
      j: () => util.serialize(parsed),
      getSchema: () => value.schema,
      toJSON: () => util.serialize(parsed),
      toString: () => JSON.stringify(util.serialize(parsed)),
      instanceOf: struct => value.instanceOf(struct)
    });
    return parsed;
  };

  obj.parse = parse;
  return appendContainerData(obj);
};

module.exports = {
  arr: arrayContainer,
  array: arrayContainer
};
