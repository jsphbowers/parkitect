import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TripGoersService {
  async addTripGoer(tripGoerData) {
    const trip = await dbContext.Trips.findById(tripGoerData.tripId)
    if (trip.isArchived == true) {
      throw new BadRequest('You cannot alter a trip that has been archived.')
    }
    const tripGoer = await dbContext.TripGoers.create(tripGoerData)
    await tripGoer.populate('account')
    await tripGoer.populate('trip')
    return tripGoer
  }

  async getTripGoers(tripId) {
    const tripGoers = await dbContext.TripGoers.find({ tripId }).populate('account', 'name picture').populate('trip')
    if (tripGoers.length == 0) {
      throw new BadRequest('Invalid tripId')
    }
    return tripGoers
  }

  async deleteTripGoer(tripId, userId, tripGoerId) {
    const trip = await dbContext.Trips.findById(tripId)
    if (!trip) {
      throw new BadRequest("Invalid tripId")
    }
    if (trip.creatorId != userId) {
      throw new Forbidden("You are not authorized to edit another user's trip")
    }
    if (trip.isArchived == true) {
      throw new BadRequest("You cannot edit an archived trip")
    }
    const tripGoer = await dbContext.TripGoers.findById(tripGoerId)
    if (!tripGoer) {
      throw new BadRequest("Invalid tripGoerId")
    }
    tripGoer.remove()
    return `tripGoer with id ${tripGoer.id} has successfully been removed from ${trip.name}`
  }

  async getMyTripGoers(userId) {
    const tripGoers = await dbContext.TripGoers.find({ accountId: userId }).populate('account').populate('trip')
    return tripGoers
  }
}

export const tripGoersService = new TripGoersService()