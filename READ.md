<img src="https://raw.github.com/slaveofcode/jkt/master/logos/jkt400.png" align="right" />

# JKT Parser

It's time to add a little salt to our JSON.

## Background

At the first time I wonder how could I make my JSON to be more manageable. So confusing when everytime I checking up the right parameters to my function, make sure the produced JSON data are valid and parsing all over the JSON properties to follow my rules (types).

Then I do research and no one module is available to fit in with my case, so I built this one.

**JKT** is a simple **Javascript** module to create a structure for your JSON. It's basically just a simple parser to handle property types, the structure and provide a small helper to handle the data.

### Prerequisites

To use JKT you need a NodeJS version `6.4.0` and up. Basically JKT really depends on ES6 style which using template literal in practice.

```
const jkt = require('jkt') // CommonJs

const Person = jkt`
  name: String
  age: Number
  birthday: Date
  hobbies: Array
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

You just have to define the JKT struct once and then you could rely on them. The struct is defined by using template literal.

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
| `String!`   | Force to only accept string value                             | No               | No                 |
| `Number`    | Numeric type value, works for either Integer or Float         | Yes              | Yes                 |
| `Number!`   | Force to only accept numeric value                            | No               | No                 |
| `Boolean`   | Boolean type value, works for either Integer or Float         | Yes              | Yes                 |
| `Boolean!`  | Force to only accept boolean value                            | No               | No                 |
| `Date`      | Date type value that accept `ISO 8601`, supported by `Moment` | Yes              | Yes                 |
| `Date!`     | Force to only accept valid date value                         | No               | No                 |
| `Array`     | Array type value                                              | Yes              | Yes                 |
| `Array!`    | Force to only accept array value                              | No               | No                 |
| `Object`    | Object type value                                             | Yes              | Yes                 |
| `Object!`   | Force to only accept object value                             | No               | No                 |
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

// now aditya is the instance of Person
```

Then you could use `aditya` properties or produce valid JSON format from it

```
aditya.name // "Aditya Kresna"
aditya.birthday // moment time
aditya.toJSON() // produce valid json format
aditya.j() // the shorthand method
```

One thing that you should know is if JKT fails to identify type of the value, it will returning `null` as a default, except you use **force** type like `String!` and `Number!` 

**[> See the result on RunKit](https://runkit.com/zeandcode/jkt-basic)**

### One Line vs Multi Line

There is a few method you can follow while making a struct, **One Line** and **Multi Line**. If you think your struct object is short and don't wanna make more space with using multi lines, you could simply create a struct separated by comma `,`.

```
const Animal = jkt`type: String, color: String, isWild: Boolean`
```

or by multiple lines like this

```
const Animal = jkt`
  type: String
  color: String
  isWild: Boolean
`

const Animal2 = jkt`
  type: String,
  color: String,
  beast: Boolean
`

const Animal3 = jkt`
  type: String!,
  color: String!,
  beast: Boolean
`
```

**[> See the result on RunKit](https://runkit.com/zeandcode/jkt-one-line-vs-multi-line)**

### Custom Predefined Value

When you need to setup custom value upfront, without checking it's type or doing some validations, You could use it as a predefined value by put them inside of expression `${}`. Predefined value is the value you define when defining the struct.

```
const Mother = jkt`
  name: String
  birthday: Date
  haveChild: ${true}
`

const angela = Mother({
  name: "Angela", 
  Birthday: "1990-06-06"
})

const christy = Mother({
  name: "Angela", 
  Birthday: "1990-06-06",
  haveChild: false
})

const Person = jkt`
  name: String
  sayTheWords: ${(words) => `Hi, ${words}`},
  someOptions: ${{some: "options"}}
`

const aditya = Person({
  name: "Aditya"
})

console.log(angela.haveChild) // true
console.log(christy.haveChild) // false

console.log(aditya.sayTheWords('How are you')) // "Hi, How are you"

console.log('Aditya in JSON', aditya.j()) 
// "Aditya in JSON", { name: "Aditya", someOptions: { some: "options" } }
```

**[> See the result on RunKit](https://runkit.com/zeandcode/custom-predefined-value)**

You could pass anything you want, but if you pass a `function` for example, it will not showing on the output when you calling `toJSON` or `j` function, because the value wasn't a valid JSON type.

## Authors

* **Aditya Kresna Permana** - _Indonesia_ - [SlaveOfCode](https://github.com/slaveofcode)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* This module may have some limitation based on reserved naming of the methods and properties
* Highly inspired with styled-components template literal
* This module may still buggy, make a pull request or make an issue for it.
