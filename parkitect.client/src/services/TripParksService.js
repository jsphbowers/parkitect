import { AppState } from "../AppState.js"
import { TripPark } from "../models/TripPark.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TripParksService {
  async getTripParksByTripId(tripId) {
    const res = await api.get(`trips/${tripId}/tripParks`)
    logger.log('[GETTING TRIPPARKS]', res.data)
    AppState.tripParks = res.data.map(tp => new TripPark(tp))
    logger.log('[CLASSED TRIPPARKS]', AppState.tripParks)
  }

  async getListTripParks(tripId) {
    if (!AppState.dictTripParks[tripId]) { // only get trip parks if haven't already gotten them before
      const res = await api.get(`trips/${tripId}/tripParks`)
      AppState.dictTripParks[tripId] = res.data.map(tp => new TripPark(tp))
    }
  }

  async removeParkFromTrip(tripId, tripParkId, parkCode) {
    // Deleting all activities related to park from trip
    const tripThingsToDo = AppState.tripThingsToDo.filter(t => t.parkCode == parkCode)
    const res = []
    if (tripThingsToDo.length > 0) {
      for (let i = 0; i < tripThingsToDo.length; i++) {
        await res.push(api.delete(`/trips/${tripId}/tripThingsToDo/${tripThingsToDo[i].id}`))
      }
    }
    // Deleting park itself from trip
    const res2 = await api.delete(`/trips/${tripId}/tripParks/${tripParkId}`)
    const foundIndex = AppState.tripParks.findIndex(t => t.id == tripParkId)
    AppState.tripParks.splice(foundIndex, 1)
  }
}

export const tripParksService = new TripParksService()