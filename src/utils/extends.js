"use strict";

const Splitter = require("../splitter");

const extendUtil = (baseSchema, strict) => {
  const splitter = Splitter(strict);
  return (childStrings, ...childBindings) => {
    const makeUtils = require("./make");
    const { Inst } = require("../index");
    const childSchema = splitter(childStrings, childBindings);
    const newSchema = { ...baseSchema, ...childSchema };
    return Inst(newSchema, makeUtils(newSchema));
  };
};

module.exports = extendUtil;
