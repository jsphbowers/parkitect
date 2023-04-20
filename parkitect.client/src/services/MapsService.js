import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"

class MapsService {

  async setLocations() {
    const locations = []
    AppState.parks.forEach(p => {
      let obj = {}
      obj.lat = Number(p.latitude)
      obj.lng = Number(p.longitude)
      locations.push(obj)
      AppState.locations = locations
    })
    logger.log('[LOCATIONS ARRAY]', locations)
  }
}

export const mapsService = new MapsService()