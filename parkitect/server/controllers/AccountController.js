import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .post('', this.addParkVisited)
      .put('', this.updateAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async addParkVisited(req, res, next) {
    try {
      const parkCode = req.body.parkCode
      const userId = req.userInfo.id
      const account = await accountService.addParkVisited(parkCode, userId)
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
}
