"use strict";

const Splitter = require("../splitter");
const { Inst } = require('../index')
const { makeUtils } = require("./index");

const extendUtil = (baseSchema) => {
  return (childStrings, ...childBindings, strict = false) => {
    const childSchema = Splitter(strict)(strings, childBindings);
    const newSchema = { ...baseSchema, ...childSchema };
    return Inst(newSchema, makeUtils(newSchema));
  };
};

module.exports = extendUtil;
