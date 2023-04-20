import { useRouter } from "vue-router"
import { AppState } from "../AppState.js"
import { TripGoer } from "../models/TripGoer.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Trip } from "../models/Trip.js"
import Pop from "../utils/Pop.js"

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

  async removeTripGoer(tripGoerId, tripId) {
    const res = await api.delete(`/trips/${tripId}/tripGoers/${tripGoerId}`)
    const foundIndex = AppState.tripGoers.findIndex(tg => tg.id == tripGoerId)
    Pop.toast(`${AppState.tripGoers[foundIndex].account.name} has been removed from the trip`, "success", "top")
    AppState.tripGoers.splice(foundIndex, 1)
  }

  async joinTrip(joinCode) {
    // Finding trip by joinCode, throws error if no trip is found
    const res = await api.get(`/trips/join/${joinCode}`);
    // logger.log(res.data)
    const tripId = res.data.id;
    await this.getTripGoersByTripId(tripId)
    const tripGoers = AppState.tripGoers
    // checking to make sure that user is not already on the trip
    const tripGoer = tripGoers.find(tg => tg.accountId == AppState.account.id)
    if (tripGoer) {
      Pop.toast("You are already going on this trip!", "error", "top")
      return
    }
    // if all checks pass, adding tripGoer here
    if (!tripGoer) {
      const res2 = await api.post(`/trips/${tripId}/tripGoers`);
      AppState.activeTrip = new Trip(res.data)
      Pop.toast('Successfully joined the trip!', 'success', 'top')

    }
  }
}


export const tripGoersService = new TripGoersService();
