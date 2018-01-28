"use strict";

const Splitter = require("../splitter");
const { Inst } = require("../index");
const { makeUtils } = require("./index");

const extendUtil = (baseSchema, strict) => {
  const splitter = Splitter(strict);
  return (childStrings, ...childBindings) => {
    const childSchema = splitter(strings, childBindings);
    const newSchema = { ...baseSchema, ...childSchema };
    return Inst(newSchema, makeUtils(newSchema));
  };
};

module.exports = extendUtil;
