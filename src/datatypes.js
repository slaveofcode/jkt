"use strict";

const STRING = "String";
const NUMBER = "Number";
const DATE = "Date";
const BOOLEAN = "Boolean";
const OBJECT = "Object";
const ARRAY = "Array";
const FUNCTION = "Function";
const ANY = "Any";
const ENUM = 'ENUM'

const listedOnTypes = typeName =>
  [STRING, ARRAY, BOOLEAN, DATE, FUNCTION, NUMBER, OBJECT, ANY, ENUM].includes(
    typeName
  );

module.exports = {
  STRING,
  NUMBER,
  DATE,
  BOOLEAN,
  OBJECT,
  ARRAY,
  FUNCTION,
  ANY,
  ENUM,
  listedOnTypes
};
