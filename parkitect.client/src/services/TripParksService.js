import { AppState } from "../AppState.js"
import { TripPark } from "../models/TripPark.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TripParksService {
  async getTripParkByTripId(tripId) {
    const res = await api.get(`trips/${tripId}/tripParks`)
    logger.log('[GETTING TRIPPARKS]', res.data)
    AppState.tripParks = res.data.map(tp => new TripPark(tp))
    logger.log('[CLASSED TRIPPARKS]', AppState.tripParks)
  }
}

export const tripParksService = new TripParksService()