/**
 * Returns latitude and longitude for a city.
 * @param city 
 * @returns 
 */
const getLatLOnByCityName = async (city: string) => {
  const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${city}&format=json`
  const geocodingResponse = await fetch(geocodingUrl)
  const geocodingData = await geocodingResponse.json()
  const { lat, lon } = geocodingData[0]
  return { lat, lon }
}

/**
 * Returns the temperature when given a latitude and longitude.
 */
const getTemperatureByLatLon = async (lat: number, lon: number) => {
  const weatherUrl = `https://www.7timer.info/bin/astro.php?lon=${lon}&lat=${lat}&ac=0&unit=metric&output=json&tzshift=0`
  const weatherResponse = await fetch(weatherUrl)
  const weatherData = await weatherResponse.json()
  return weatherData.dataseries[0].temp2m
}

/**
 * A calculator that some how also can add the temperature of a city to a calculation.
 * Just a bit of fun to demonstrate how to create a async fluent API.
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
   * The multiply method, 
   * Instead of mutating state, it adds a queue item
   * and just like before we return the instance.
   */
   multiply (amount: number) {
    this.#queue.push((currentValue: number) => currentValue *= amount)
    return this
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
      const { lat, lon } = await getLatLOnByCityName(city)
      const temperature = await getTemperatureByLatLon(lat, lon)
      return currentValue + temperature
    })

    // As always we return the instance.
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

}

const myCalculator = new Calculator()

const valueResolved = await myCalculator
  .addCurrentTemperature('Vienna')
  .add(7)
  .multiply(2)
  .addCurrentTemperature('Berlin')
  .add(3)

console.log(valueResolved)