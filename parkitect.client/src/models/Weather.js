export class Weather {
  constructor(data) {
    this.mainc = Math.floor((data.main.temp) - 273.15)
    this.mainf = Math.floor(((data.main.temp) - 273.15) * (9 / 5) + 32)
    this.weather = data.weather[0].main
    this.icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    this.description = data.weather[0].description
  }
}