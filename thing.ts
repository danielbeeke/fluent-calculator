/**
 * Renamed to calculator, cleaned things up a bit and added state to the class.
 */
class Calculator {

  // A private place to keep our value.
  // We start with zero.
  #value: number = 0

  /**
   * The add method, this mutates the state and just like before we return the instance.
   */
  add (amount: number) {
    this.#value += amount
    return this
  }

  /**
   * When our state is private there is no way to get it out.
   * For now we have made this method to return the current value.
   */
  value () {
    return this.#value
  }
}

const myCalculator = new Calculator()

const value = myCalculator.add(7).add(-3).value()
console.log(value)
// 4