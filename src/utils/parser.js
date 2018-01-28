"use strict";
const types = require("../datatypes");

const parse = baseSchema => {
  return (valuesToParse, strict = false) => {
    // repeat over values and parse to defined types
    // any error or failure should follow strict options
    return {
      some: "num num"
    };
  };
};

module.exports = parse;
