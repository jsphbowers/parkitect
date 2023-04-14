import { AppState } from "../AppState.js"
import { TripGoer } from "../models/TripGoer.js"

class TripGoersService {
  async getTripGoerByAccountId() {
    const res = await api.get('/account/tripGoers')
    AppState.tripGoers = res.data.map(t => new TripGoer(t))
  }
}


export const tripGoersService = new TripGoersService()
