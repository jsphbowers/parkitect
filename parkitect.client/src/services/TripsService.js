import { AppState } from "../AppState.js";
import { Trip } from "../models/Trip.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

export class TripsService {
  async createTrip(tripData) {
    // logger.log(tripData)
    const res = await api.post('/trips', tripData)
    logger.log('creating trip', res.data)
    AppState.trips.push(new Trip(res.data))
    return new Trip(res.data)
  }
}

export const tripsService = new TripsService();
