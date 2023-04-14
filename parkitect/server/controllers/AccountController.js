import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { tripGoersService } from "../services/TripGoersService.js"
import { tripsService } from "../services/TripsService.js"

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .put('', this.updateAccount)
      .get('/tripGoers', this.getMyTripGoers)
      .get('/trips', this.getMyTrips)

  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async updateAccount(req, res, next) {
    try {
      const accountEdits = req.body
      const account = req.userInfo
      const editedAccount = await accountService.updateAccount(account, accountEdits)
      res.send(editedAccount)
    } catch (error) {
      next(error)
    }
  }

  async getMyTripGoers(req, res, next) {
    try {
      const userId = req.userInfo.id
      const tripGoers = await tripGoersService.getMyTripGoers(userId)
      res.send(tripGoers)
    } catch (error) {
      next(error)
    }
  }

  async getMyTrips(req, res, next) {
    try {
      const userId = req.userInfo.id
      const trips = await tripsService.getMyTrips(userId)
      res.send(trips)
    } catch (error) {
      next(error)
    }
  }


}
