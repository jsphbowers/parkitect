import { AppState } from "../AppState.js"
import { TripGoer } from "../models/TripGoer.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TripGoersService {
  async getTripGoerByAccountId() {
    const res = await api.get('/account/tripGoers')
    logger.log('[tripgoers data]', res.data)
    AppState.tripGoers = res.data.map(t => new TripGoer(t))
  }

  async getTripGoersByTripId(tripId) {
    const res = await api.get(`/trips/${tripId}/tripGoers`)
    AppState.tripGoers = res.data.map(tg => new TripGoer(tg))
  }
}


export const tripGoersService = new TripGoersService();
