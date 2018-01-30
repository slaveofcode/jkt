"use strict";

const chai = require("chai");
const jkt = require(`${src}/index`);

const expect = chai.expect;

describe("Struct", () => {
  it("should be able to extend", () => {
    const schema = struct`
      name: String
    `;
  });
  it("should trigger error when using reserved words", () => {});
  it("should be able to parse in-listed values", () => {});
  it("should be able to parse object values", () => {});
  it("should be able to parse function values", () => {});
});
