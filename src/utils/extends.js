"use strict";

const Splitter = require("../splitter");
const makeUtils = require("./make");
const { Inst } = require("../index");

const extendUtil = (baseSchema, strict) => {
  const splitter = Splitter(strict);
  return (childStrings, ...childBindings) => {
    const childSchema = splitter(childStrings, childBindings);
    const newSchema = { ...baseSchema, ...childSchema };
    console.log(makeUtils)
    return Inst(newSchema, makeUtils(newSchema));
  };
};

module.exports = extendUtil;
