# jkt

A little salt to your json data.

This small library provides you a simple utility to parse and serialize json data, it can manages the structure and types of your json.
The library handles the exact value to strictly follow the defined types, so you don't have to worry about the conversion or checking your json value & structure every time you passed it as an argument.

## Enough Talking and Take My Money

This library was inspired when every time I check the type of arguments to pass into some function. With that idea in my mind I try to figure out what I can build to handle the situation, so my time wasn't spent too much doing repetitive action.

So **JKT** is coming onto my head, because it's an abbreviation of "Jakarta" the city where I'm working (when I struggle of).

### The Concept

You just have to define the JKT schema once and then you could rely on them for the rest of your life. The schema is defined by using template literal so you don't have to writing json structure every time (I don't like to write it actually).

Here's the example of the schema

```
const person = jkt`
  name: String
  age: Number
`
```
