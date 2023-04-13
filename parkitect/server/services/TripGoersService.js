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
}

export const tripGoersService = new TripGoersService()