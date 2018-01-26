"use strict";

const Splitter = require("../splitter");
const { makeUtils } = require("./index");

const extendUtil = (baseSchema, strict = false) => {
  const splitter = Splitter(strict);
  return (childStrings, ...childBindings) => {
    const childSchema = splitter(strings, bindings);
    const newSchema = { ...baseSchema, ...childSchema };
    Object.assign(newSchema, { util: makeUtils(newSchema) });
    return newSchema;
  };
};

module.exports = extendUtil;
