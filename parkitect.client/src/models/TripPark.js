export class TripPark {
  constructor(data) {
    this.id = data.id
    this.fullName = data.fullName
    this.tripId = data.tripId
    this.nativeParkId = data.nativeParkId
    this.image = data.image
    this.parkCode = data.parkCode
  }
}