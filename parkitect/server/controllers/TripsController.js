import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tripsService } from "../services/TripsService.js";

export class TripsController extends BaseController {
  constructor() {
    super('/trips')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrip)
      .get('/:tripId', this.getTripById)
  }

  async createTrip(req, res, next) {
    try {
      const tripData = req.body
      tripData.creatorId = req.userInfo.id
      tripData.joinCode = Math.floor(Math.random() * 1000000)
      const trip = await tripsService.createTrip(tripData)
      res.send(trip)
    } catch (error) {
      next(error)
    }
  }

  async getTripById(req, res, next) {
    try {
      const tripId = req.params.tripId
      const trip = await tripsService.getTripById(tripId)
      res.send(trip)
    } catch (error) {
      next(error)
    }
  }
}