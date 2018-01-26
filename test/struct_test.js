"use strict";

const chai = require("chai");
const jkt = require(`${src}/index`);

const expect = chai.expect;

describe("Struct", () => {
  it("should be able to use wit basic operation", () => {
    const schema = struct`
      name: String
    `;
  });
});
