import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { tripsService } from "../services/TripsService.js";
import { tripParksService } from "../services/TripParksService.js";
import { tripThingsToDoService } from "../services/TripThingsToDoService.js";
import { tripGoersService } from "../services/TripGoersService.js";

export class TripsController extends BaseController {
  constructor() {
    super('/trips')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrip)
      .get('/:tripId', this.getTripById)
      .put('/:tripId', this.editTrip)
      .delete('/:tripId', this.toggleArchiveTrip)
      .post('/:tripId/tripParks', this.addTripPark)
      .get('/:tripId/tripParks', this.getTripParks)
      .delete('/:tripId/tripParks/:tripParkId', this.deleteTripPark)
      .post('/:tripId/tripThingsToDo', this.addTripThingToDo)
      .get('/:tripId/tripThingsToDo', this.getTripThingsToDo)
      .delete('/:tripId/tripThingsToDo/:tripThingToDoId', this.deleteTripThingToDo)
      .post('/:tripId/tripGoers', this.addTripGoer)
      .get('/:tripId/tripGoers', this.getTripGoers)
      .delete('/:tripId/tripGoers/:tripGoerId', this.deleteTripGoer)
  }

  // SECTION trips
  //#region 
  async createTrip(req, res, next) {
    try {
      const tripData = req.body
      tripData.creatorId = req.userInfo.id
      tripData.joinCode = Math.ceil(Math.random() * 1000000)
      const trip = await tripsService.createTrip(tripData)
      const tripGoerData = {}
      tripGoerData.accountId = req.userInfo.id
      tripGoerData.tripId = trip.id
      const tripGoer = await tripGoersService.addTripGoer(tripGoerData)
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

  async editTrip(req, res, next) {
    try {
      const tripId = req.params.tripId
      const tripEdits = req.body
      const userId = req.userInfo.id
      const trip = await tripsService.editTrip(tripId, tripEdits, userId)
      res.send(trip)
    } catch (error) {
      next(error)
    }
  }

  async toggleArchiveTrip(req, res, next) {
    try {
      const tripId = req.params.tripId
      const userId = req.userInfo.id
      const trip = await tripsService.toggleArchiveTrip(tripId, userId)
      res.send(trip)
    } catch (error) {
      next(error)
    }
  }
  //#endregion

  // SECTION tripParks
  //#region 
  async addTripPark(req, res, next) {
    try {
      const tripParkData = req.body
      tripParkData.tripId = req.params.tripId
      const tripPark = await tripParksService.addTripPark(tripParkData)
      res.send(tripPark)
    } catch (error) {
      next(error)
    }
  }

  async getTripParks(req, res, next) {
    try {
      const tripId = req.params.tripId
      const tripParks = await tripParksService.getTripParks(tripId)
      res.send(tripParks)
    } catch (error) {
      next(error)
    }
  }

  async deleteTripPark(req, res, next) {
    try {
      const tripParkId = req.params.tripParkId
      const userId = req.userInfo.id
      const tripId = req.params.tripId
      const message = await tripParksService.deleteTripPark(tripParkId, userId, tripId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
  //#endregion

  // SECTION tripThingsToDo
  // #region
  async addTripThingToDo(req, res, next) {
    try {
      const tripThingToDoData = req.body
      tripThingToDoData.tripId = req.params.tripId
      const tripThingToDo = await tripThingsToDoService.addTripThingToDo(tripThingToDoData)
      res.send(tripThingToDo)
    } catch (error) {
      next(error)
    }
  }

  async getTripThingsToDo(req, res, next) {
    try {
      const tripId = req.params.tripId
      const tripThingsToDo = await tripThingsToDoService.getTripThingsToDo(tripId)
      res.send(tripThingsToDo)
    } catch (error) {
      next(error)
    }
  }

  async deleteTripThingToDo(req, res, next) {
    try {
      const tripId = req.params.tripId
      const userId = req.userInfo.id
      const tripThingToDoId = req.params.tripThingToDoId
      const message = await tripThingsToDoService.deleteTripThingToDo(tripId, userId, tripThingToDoId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
  //#endregion

  // SECTION tripGoers
  //#region 
  async addTripGoer(req, res, next) {
    try {
      const tripGoerData = req.body
      tripGoerData.accountId = req.userInfo.id
      tripGoerData.tripId = req.params.tripId
      const tripGoer = await tripGoersService.addTripGoer(tripGoerData)
      res.send(tripGoer)
    } catch (error) {
      next(error)
    }
  }

  async getTripGoers(req, res, next) {
    try {
      const tripId = req.params.tripId
      const tripGoers = await tripGoersService.getTripGoers(tripId)
      res.send(tripGoers)
    } catch (error) {
      next(error)
    }
  }

  async deleteTripGoer(req, res, next) {
    try {
      const tripGoerId = req.params.tripGoerId
      const userId = req.userInfo.id
      const tripId = req.params.tripId
      const message = await tripGoersService.deleteTripGoer(tripId, userId, tripGoerId)
      res.send(message)
    } catch (error) {
      next(error)
    }
  }
  //#endregion
}