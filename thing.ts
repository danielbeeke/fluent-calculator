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

  /**
   * If async and await is a bit new for you checkout 
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
   * 
   * So we are going to fetch the current weather for the given city.
   * First we get the latitude and the longitude and the nthe weather.
   */
  async addCurrentTemperature (city: string) {
    // First we get the location of the given city.
    const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
    const geocodingResponse = await fetch(geocodingUrl)
    const geocodingData = await geocodingResponse.json()
    const { lat, lon } = geocodingData[0]

    const weatherUrl = `https://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&ac=0&unit=metric&output=json&tzshift=0`
    const weatherResponse = await fetch(weatherUrl)
    const weatherData = await weatherResponse.json()
    const temperature = weatherData.dataseries[0].temp2m
    console.log(temperature)
  }
}

const myCalculator = new Calculator()
const value = await myCalculator.addCurrentTemperature('Vienna')
console.log(value)
// 5 or some other temperature.

/**
 * PS. as you see we are using await here. It might be hard to still chain things.
 * Promises return .then, .catch and .finally instead of our awesome methods.
 */