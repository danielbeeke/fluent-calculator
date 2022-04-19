# Fluent Calculator

This fluent calculator is an example demonstrating fluent APIs.
It is part of a presentation explaining how to make your own fluent API.

You can go through the git commits to learn how to make your own fluent API.

We will discuss the following topics:

- A chain of methods
- Holding state
- `then`
- And possibly more

## Part 1: A chain of methods

A fluent API looks a lot like a chain. It is a chain of methods.

jQuery is an example of sync fluent API: 

```JavaScript
$('my-element').fadeIn().fadeOut().height('100px')
```

Let's create a class with methods that we can call like this: `thing.methodOne().methodTwo()`.

The code is in the file: thing.ts.
If you want to execute code here, you can do so with [Deno](https://deno.land/).
It helps to also install the Deno plugin, if you are using Visual Studio Code.
```
deno run thing.ts
// methodOne
// methodTwo
```