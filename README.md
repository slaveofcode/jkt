# jkt

A little salt to your json data.

This small library provides you a simple utility to parse and serialize json data, it can manages the structure and types of your json.
The library handles the exact value to strictly follow the defined types, so you don't have to worry about the conversion or checking your json value & structure every time you passed it as an argument.

## Enough Talking and Take My Money

This library was inspired when every time I check the type of arguments to pass into some function. With that idea in my mind I try to figure out what I can build to handle the situation, so my time wasn't spent too much doing repetitive action.

So **JKT** is coming onto my head, because it's an abbreviation of "Jakarta" the city where I'm working (when I struggle of).

### The Concept

You just have to define the JKT schema once and then you could rely on them for the rest of your life. The schema is defined by using template literal so you don't have to writing json structure every time (I don't like to write json for that actually).

Here's the example of the schema

```
const person = jkt`
  name: String
  age: Number
`
```

You can assume the `person` as a schema for your json data, then every time you do parsing for json you just have to pass an argument into the `person` like below.

```
const John = person({
  name: "John Doe",
  age: '26'
})

// it makes John a person object like
// You can call it by
console.log(John.name, John.age) // produces "John Doe" in string and 26 in number
```

Once you define the `person` schema, you could use it everywhere makes instance of it and also consume the parsed values. The value that produces is converted safely following the type defined before, if it's `String` it will converted to string, if the type is `Number` it will be converted to following int or float (based on the provided value).
