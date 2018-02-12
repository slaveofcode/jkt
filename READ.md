<img src="https://raw.github.com/slaveofcode/jkt/master/logos/jkt400.png" align="right" />

# JKT Parser

It's time to add a little salt for your JSON.

## Getting Started

At the first time I wonder how could I make my JSON to be more manageable. So confusing when everytime I checking up the right parameters to my function, make sure the produced JSON data are valid and parsing all over the JSON properties to follow my rules (types).

Then I do research and no one module is available to fit in with my case, so I built this one.

**JKT** is a simple **NodeJS** module when you need a structure for your JSON. It's just a simple parser to handle the types, JSON structure and provide a small helper to handle the data.

### Prerequisites

To use JKT you need a NodeJS version `6.4.0` and up. Basically JKT really depends on ES6 style which using template literal in practice.

```
const jkt = require('jkt')

const Person = jkt`
  name: String
  age: Number
  birthday: Date
  Hobbies: Array
`
```

### Installing

As described before, you need NodeJs with version `6.4.0` and up before using this module. After that installing JKT is just simply as.

> Using NPM

```
npm i jkt --save
```

> Using Yarn

```
yarn add jkt
```

When finished you'll notice that this modules requires some libraries like `lodash`, `moment` and `shortid`.

## Running the tests

The test is very very simple, you just have to clone the project, do `npm install` and run `npm run test`, nothing special.

## API References

### Struct

You just have to define the JKT struct once and then you could rely on them for the rest of the day. The struct is defined by using template literal.

```
const Person = jkt`
  name: String
  age: Number
  birthday: Date
  Hobbies: Array
`
```

### Available Types

| Type        | Description                                                   | Show on Invalid? | Show on JSON result |
| ----------- | ------------------------------------------------------------- | ---------------- | ------------------- |
| `String`    | String type value                                             | Yes              | Yes                 |
| `String!`   | Force to only accept string value                             | No               | Yes                 |
| `Number`    | Numeric type value, works for either Integer or Float         | Yes              | Yes                 |
| `Number!`   | Force to only accept numeric value                            | No               | Yes                 |
| `Boolean`   | Boolean type value, works for either Integer or Float         | Yes              | Yes                 |
| `Boolean!`  | Force to only accept boolean value                            | No               | Yes                 |
| `Date`      | Date type value that accept `ISO 8601`, supported by `Moment` | Yes              | Yes                 |
| `Date!`     | Force to only accept valid date value                         | No               | Yes                 |
| `Array`     | Array type value                                              | Yes              | Yes                 |
| `Array!`    | Force to only accept array value                              | No               | Yes                 |
| `Object`    | Object type value                                             | Yes              | Yes                 |
| `Object!`   | Force to only accept object value                             | No               | Yes                 |
| `Function`  | Function type value                                           | No               | No                  |
| `Function!` | Force to only accept function                                 | No               | No                  |
| `ANY`       | Any type value will be valid                                  | Yes              | Yes                 |

### Instance of Struct

You can assume the `Person` as a structure for json data, then every time you do parsing, you just have to pass an argument into `Person`.

```
const aditya = Person({
  name: "Aditya Kresna",
  age: '26',
  birthday: '1991-06-18' // ISO 8601
})

// now aditya is instance of the Person
```

Then you could make `aditya` to produce valid JSON format

```
aditya.toJSON() // produce valid json format
aditya.j() // the shorthand method
```

[see the result on runkit](https://runkit.com/zeandcode/jkt-basic)

## Authors

* **Aditya Kresna Permana** - _Indonesia_ - [SlaveOfCode](https://github.com/slaveofcode)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This module may have some limitation based on reserved naming of the methods and properties
* Highly inspired with styled-components template literal
* This module may still buggy, make a pull request or make an issue for it.
