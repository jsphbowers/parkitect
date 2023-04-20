import { mapsService } from "../services/MapsService.js";
import BaseController from "../utils/BaseController.js";

export class MapsController extends BaseController {
  constructor() {
    super("/maps")
    this.router

      .get('', this.getMap)
  }

  async getMap(req, res, next) {
    try {
      const URL = req.body
      const map = await mapsService.getMap(URL)
      res.send(map)
    } catch (error) {
      next(error)
    }
  }

}