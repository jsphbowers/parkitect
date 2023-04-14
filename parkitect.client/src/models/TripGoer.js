import { Account } from "./Account.js"
import { Trip } from "./Trip.js"

export class TripGoer {
  constructor(data) {
    this.id = data.id
    this.accountId = data.accountId
    this.tripId = data.tripId
    this.trip = new Trip(data.trip)
    this.account = new Account(data.account)
  }
}