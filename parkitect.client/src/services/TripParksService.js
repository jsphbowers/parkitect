import { AppState } from "../AppState.js"
import { TripPark } from "../models/TripPark.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TripParksService {
  async getTripParksByTripId(tripId) {
    const res = await api.get(`trips/${tripId}/tripParks`)
    logger.log('[GETTING TRIPPARKS]', res.data)
    let parkExists = false
    res.data.forEach(tp => {
      if (tp.nativeParkId == AppState.activePark.nativeId) {
        parkExists = true
      }
    })
    logger.log(parkExists)
    AppState.tripParks = res.data.map(tp => new TripPark(tp))
    logger.log('[CLASSED TRIPPARKS]', AppState.tripParks)
    return parkExists
  }
}

export const tripParksService = new TripParksService()