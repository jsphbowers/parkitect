import { AppState } from "../AppState.js";
import { Trip } from "../models/Trip.js";
import { TripGoer } from "../models/TripGoer.js";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop.js";
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
    // logger.log('[ACTIVE TRIP]', AppState.activeTrip)
  }

  async getMyCreatedTrips() {
    const res = await api.get(`/account/trips`)
    // logger.log(res.data)
    AppState.trips = res.data.map(t => new Trip(t))
    // logger.log('[THIS IS THE TRIPS IN THE APPSTATE]', AppState.trips)
  }

  async addParkToTrip(tripId, nativeParkId, parkName) {
    // logger.log('[WE BE ADDING A PARK]', tripId, nativeParkId)
    const parkData = {
      fullName: parkName,
      nativeParkId: nativeParkId,
      image: AppState.activePark.images[0].url,
      parkCode: AppState.activePark.parkCode
    }
    const res = await api.post(`/trips/${tripId}/tripParks`, parkData)
    logger.log('[THIS IS BEFORE THE PUSH]', AppState.dictTripParks[tripId])
    AppState.dictTripParks[tripId].push(res.data)
    logger.log('[THIS IS THE APPSTATE WITH THE PUSHED ACTIVITY]', AppState.dictTripParks[tripId])
  }

  async addActivityToTrip(tripId, nativeThingToDoId, activityTitle) {
    logger.log('[WE BE ADDING AN ACTIVITY]', tripId, nativeThingToDoId, activityTitle)
    const thingToDoData = {
      title: activityTitle,
      nativeThingToDoId: nativeThingToDoId,
      parkCode: AppState.activePark.parkCode,
      activities: AppState.activeThingToDo.activities
    }
    const res = await api.post(`/trips/${tripId}/tripThingsToDo`, thingToDoData)
    logger.log('[THIS IS THE RETURNED ACTIVITY ADDED TO TRIP]', res.data)
    AppState.dictThingsToDo[tripId].push(res.data)

  }

  async addActivity(activityId) {
    logger.log(activityId, 'from service')
  }

  async editTrip(tripData, tripId) {
    const res = await api.put(`/trips/${tripId}`, tripData)
    AppState.activeTrip = new Trip(res.data)
    logger.log('[EDITING TRIP]', res.data)
  }



}

export const tripsService = new TripsService();
