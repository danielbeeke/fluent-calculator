# Fluent Calculator

This fluent calculator is an example demonstrating fluent APIs.
It is part of a presentation explaining how to make your own fluent API.

You can go through the git commits to learn how to make your own fluent API.

We will discuss the following topics:

- A chain of methods
- Holding state
- `then`
- Making a queue instead of direct mutating.
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
deno run --allow-all thing.ts
// methodOne
// methodTwo
```

## Part 2: Holding state

Just calling methods is nice, but what about state?
We can use the class instance to hold state.

Check thing.ts to see how.

## Part 3: `then`

Okay, we have a fluent api that can add a number to the instance. But what if we would like our calculator to also include the current weather? I mean, calculators can be very boring.

Now we are adding async methods to the calculator.

And unfortunatly we end up with a little problem, we have a promise result that we want to chain.
