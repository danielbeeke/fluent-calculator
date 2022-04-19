/**
 * Renamed to calculator, cleaned things up a bit and added state to the class.
 */
class Calculator {

  #queue: Array<(currentValue: number) => number | Promise<number>> = [] 

  /**
   * The add method, 
   * Instead of mutating state, it adds a queue item
   * and just like before we return the instance.
   */
  add (amount: number) {
    this.#queue.push((currentValue: number) => currentValue += amount)
    return this
  }

  /**
   * We have renamed the method value to then.
   * Our class will act like a Promise.
   */
  async then (resolve: (result: number) => void) {
    let value = 0

    for (const queueCallback of this.#queue)
      value = await queueCallback(value)

    resolve(value)
  }

  /**
   * If async and await is a bit new for you checkout 
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
   * 
   * So we are going to fetch the current weather for the given city.
   * First we get the latitude and the longitude and the nthe weather.
   */
  addCurrentTemperature (city: string) {
    this.#queue.push(async (currentValue: number) => {
      // First we get the location of the given city.
      const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
      const geocodingResponse = await fetch(geocodingUrl)
      const geocodingData = await geocodingResponse.json()
      const { lat, lon } = geocodingData[0]

      // Here we get the temperature.
      const weatherUrl = `https://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&ac=0&unit=metric&output=json&tzshift=0`
      const weatherResponse = await fetch(weatherUrl)
      const weatherData = await weatherResponse.json()
      const temperature = weatherData.dataseries[0].temp2m

      return currentValue + temperature
    })

    // As always we return the instance.
    return this
  }
}

const myCalculator = new Calculator()
const value = myCalculator.addCurrentTemperature('Vienna').add(7)
console.log(value)
// Calculator {}  Will give our Calculator instance.

// But now:
const valueResolved = await myCalculator.addCurrentTemperature('Vienna').add(7)
console.log(valueResolved)