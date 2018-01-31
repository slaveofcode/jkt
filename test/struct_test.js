"use strict";

const chai = require("chai");
const jkt = require(`${src}/index`);

chai.should();
chai.use(require("chai-things"));

const expect = chai.expect;

describe("Struct", () => {
  it("should be able to extend", () => {
    const person = jkt`
      name: String
      age: Number
    `;

    const father = person`
      hasFamily: Boolean
    `;

    const schema = father({}).getSchema();
    expect(schema).to.deep.equal({
      name: "String",
      age: "Number",
      hasFamily: "Boolean"
    });
  });
  it("should be able to parse value with type ENUM", () => {
    const shm1 = jkt`
      carTypes: ENUM[SUV, SEDAN, SPORT, TRUCK]
    `;
    const shm2 = jkt`
      color: ENUM[RED: Merah, GREEN: Hijau]
    `;
    expect(shm1.carTypes).to.deep.equal({
      SUV: "SUV",
      SEDAN: "SEDAN",
      SPORT: "SPORT",
      TRUCK: "TRUCK"
    });

    expect(shm2.carTypes).to.deep.equal({
      RED: "Merah",
      GREEN: "Hijau"
    });
  });
  it("should be able to extend from existing struct", () => {});
  it("should be able to extend from existing struct with deleting parent property", () => {});
  it("should trigger error when using reserved words", () => {});
  it("should be able to parse in-listed values", () => {});
  it("should be able to parse object values", () => {});
  it("should be able to parse function values", () => {});
  it("should have built-in properties for default jkt object", () => {
    // check isJkt
    // check schema
    // check instance has function getSchema, toJSON, toString
  });
  it("should be able to use existing struct as a nested struct", () => {});
});
