# Fluent Calculator

This fluent calculator is an example demonstrating fluent APIs.
It is part of a [presentation](https://danielbeeke.nl/fluent-interfaces/) explaining how to make your own fluent API.

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

## Part 4: Making a queue instead of direct mutating

So last part we saw how we can prepare to get asynchronous data. But it gave us a promise.
Instead of getting data immediately we will make a queue.
And then execute that queue with `then`.

Lets check thing.ts!

The main thing we are doing now is shifting the execution to the end.
All calculations are put into anonymous functions that are put into an array to be executed later.
When the programmer is using `await thing.method()` it is just doing `thing.method().then()`.
So the cool thing is, the `then` is our signal that we should return a value and thus start executing our queue functions.
To act like a promise or thenable we should have a then method that accepts a callback and we should call execute callback (resolve).

## Final result

```JavaScript
const myCalculator = new Calculator()

const valueResolved = await myCalculator
  .addCurrentTemperature('Vienna')
  .add(7)
  .multiply(2)
  .addCurrentTemperature('Berlin')
  .add(3)

console.log(valueResolved)
// I would not know the outcome when you look but today it is 37.

```
