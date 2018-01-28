"use strict";

const serialize = () => {
  return (parsedValues, showUndefVal = false) => {
    // repeat over values and parse to defined types
    // any error or failure should follow strict options
    return {
      some: "value"
    };
  };
};

module.exports = serialize;
