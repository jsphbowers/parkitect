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
      .post('/:tripId/tripParks', this.addTripPark)
      .get('/:tripId/tripParks', this.getTripParks)
      .post('/:tripId/tripThingsToDo', this.addTripThingToDo)
      .get('/:tripId/tripThingsToDo', this.getTripThingsToDo)
      .post('/:tripId/tripGoers', this.addTripGoer)
      .get('/:tripId/tripGoers', this.getTripGoers)
  }


  // SECTION trips
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

  // SECTION tripParks
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

  // SECTION tripThingsToDo
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

  // SECTION tripGoers
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
}