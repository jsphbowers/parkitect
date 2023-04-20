import { useRouter } from "vue-router"
import { AppState } from "../AppState.js"
import { TripGoer } from "../models/TripGoer.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Trip } from "../models/Trip.js"

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
    AppState.tripGoers.splice(foundIndex, 1)
  }

  async joinTrip(joinCode) {
    const res = await api.get(`/trips/join/${joinCode}`);
    // logger.log(res.data)
    const tripId = res.data.id;
    const res2 = await api.post(`/trips/${tripId}/tripGoers`);
  //   const router = useRouter()
  //   router.push({ name: 'TripDetails', params: { tripId: tripId } })
    AppState.activeTrip = new Trip(res.data)
  }
}


export const tripGoersService = new TripGoersService();
