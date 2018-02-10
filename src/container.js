"use strict";

const { isJKTObject, isArray } = require("./utils/detector");

const baseContainerData = {
  isContainer: true
};

const arrayContainer = value => {
  const obj = Object.assign({}, baseContainerData, {
    parse: (valueParser, valueToParse) => {
      console.log(typeof valueToParse);
      if (isArray(valueToParse)) {
        const parsedValues = [];
        valueToParse.forEach(valueToParse => {
          if (isJKTObject(value)) {
            parsedValues.push(valueParser(value.__schema, valueToParse));
          } else {
            parsedValues.push(valueToParse);
          }
        });
        return parsedValues;
      } else {
        return [];
      }
    }
  });

  return obj;
};

module.exports = {
  arr: arrayContainer
};
