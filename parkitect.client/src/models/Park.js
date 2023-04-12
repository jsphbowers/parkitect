


export class Park {
  constructor(data) {
    this.nativeId = data.id
    this.parkCode = data.parkCode
    this.name = data.fullName
    this.description = data.description
    this.latitude = data.latitude
    this.longitude = data.longitude
    this.states = data.states
    this.contacts = data.contacts
    this.entranceFees = data.entranceFees
    this.operatingHours = data.operatingHours
    this.addresses = data.addresses
    this.images = data.images
    this.weatherInfo = data.weatherInfo
  }
}