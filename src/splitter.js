"use strict";

const types = require(`./datatypes`);

const splitter = (strict = false) => {
  return (strings, bindings) => {
    // In loop of splitted strings
    // Remove all the spaces
    // Remove all new lines chars
    // Split based on colon (:)
    // validate the value side
    // - Check the value is a defined types, Class Obj, Function or static Defined value (string, number, boolean, date, object)
    // - if strict true (every invalid value should trigger eror exception)
    // - added the key with value to return
    // Return
  };
};

module.exports = splitter;
