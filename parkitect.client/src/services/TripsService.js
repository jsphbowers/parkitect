import { AppState } from "../AppState.js";
import { Trip } from "../models/Trip.js";
import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

export class TripsService {
  async createTrip(tripData) {
    // logger.log(tripData)
    const res = await api.post('/trips', tripData)
    logger.log('creating trip', res.data)
    AppState.trips.push(new Trip(res.data));
    return new Trip(res.data);
  }

  async getMyTrip(tripId) {
    const res = await api.get(`/trips/${tripId}`)
    AppState.activeTrip = new Trip(res.data)
  }

  async getMyCreatedTrips(accountId) {
    logger.log(accountId)
  }

  async addActivity(activityId) {
    logger.log(activityId, 'from service')
  }
}

export const tripsService = new TripsService();
