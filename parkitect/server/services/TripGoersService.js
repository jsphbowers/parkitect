import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class TripGoersService {
  async addTripGoer(tripGoerData) {
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
}

export const tripGoersService = new TripGoersService()