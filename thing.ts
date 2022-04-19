/**
 * The important part for fluent API's is that we return the class instance from every method.
 * You will see that TypeScript also works fine.
 */
class Thing {

  methodOne () {
    console.log('methodOne')
    return this
  }

  methodTwo () {
    console.log('methodTwo')
    return this
  }

}

const myThing = new Thing()

myThing.methodOne().methodTwo()
// methodOne
// methodTwo