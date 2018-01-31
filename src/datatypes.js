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


const parserableTypes = typeName =>
  [STRING, ARRAY, BOOLEAN, DATE, FUNCTION, NUMBER, OBJECT, ANY].includes(
    typeName
  );

const isEnum = value => 
  /ENUM\[(((\s*([A-Z]+)\s*):?(\s*([A-Za-z0-9\s]+)\s*)?)\s*,*\s*)+]/g.test(value)

const isDeleteProperty = value => /\s*\!DELETE\s*/g.test(value)

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
  parserableTypes,
  isEnum,
  isDeleteProperty
};
