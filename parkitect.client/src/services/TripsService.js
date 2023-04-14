import { logger } from "../utils/Logger";
import { api } from "./AxiosService";

export class TripsService {
  async createTrip(tripData) {
    const res = await api.post('/trips', tripData)
    logger.log('creating trip', res.data)
  }

  async addActivity(activityId) {
    logger.log(activityId, 'from service')
  }
}

export const tripsService = new TripsService();
