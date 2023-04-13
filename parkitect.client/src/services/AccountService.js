import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  // async visitPark(parkCode) {
  //   const res = await api.post('/account', parkCode)
  //   logger.log('[Visit park raw Data]', res.data)
  // }

  async editAccount() {
    const res = await api.put('/account', AppState.account)
    AppState.account = new Account(res.data)
  }

}


export const accountService = new AccountService()
