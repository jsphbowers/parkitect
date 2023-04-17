import { AppState } from "../AppState.js"
import { ThingToDo } from "../models/ThingToDo.js"
import { TripThingToDo } from "../models/TripThingToDo.js"
import { logger } from "../utils/Logger.js"
import { api, npsApi } from "./AxiosService.js"

class TripThingsToDoService {

  async getTripThingsToDoByTripId(tripId) {
    const res = await api.get(`/trips/${tripId}/tripThingsToDo`)
    AppState.tripThingsToDo = res.data.map(ttd => new TripThingToDo(ttd))
  }

  async getThingsToDoForActivityList(tripId) {
    if (!AppState.dictThingsToDo[tripId]) {
      const dictionary = AppState.dictThingsToDo
      dictionary[tripId] = []

      const res = await api.get(`trips/${tripId}/tripThingsToDo`)
      dictionary[tripId] = res.data
    }
  }

  async setActiveThingToDo(nativeThingToDoId) {
    const res = await npsApi.get(`/thingstodo?id=${nativeThingToDoId}`)
    AppState.activeThingToDo = new ThingToDo(res.data.data[0])
  }

  async removeThingToDoFromTrip(tripId, thingToDoId, parkCode) {
    const res = await api.delete(`/trips/${tripId}/tripThingsToDo/${thingToDoId}`)
    const foundIndex = AppState.tripThingsToDo.findIndex(t => t.id == thingToDoId)
    AppState.tripThingsToDo.splice(foundIndex, 1)
  }

}

export const tripThingsToDoService = new TripThingsToDoService()