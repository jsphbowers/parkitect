import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class TripGoersService {
  async addTripGoer(tripGoerData) {
    const accountId = tripGoerData.accountId
    const tripGoerCheck = await dbContext.TripGoers.find({ accountId })
    if (!tripGoerCheck) {
      const tripGoer = await dbContext.TripGoers.create(tripGoerData)
      await tripGoer.populate('account')
      await tripGoer.populate('trip')
      return tripGoer
    }
    else if (tripGoerCheck) {
      throw new BadRequest('You are already a member of this trip')
    }
  }

  async getTripGoers(tripId) {
    const tripGoers = await dbContext.TripGoers.find({ tripId }).populate('account', 'name picture').populate('trip')
    if (!tripGoers) {
      throw new BadRequest('Invalid tripId')
    }
    return tripGoers
  }
}

export const tripGoersService = new TripGoersService()