// @ts-ignore
import { googleApiKey } from "../../.variables"


class MapsService {

  async getMap(URL) {
    // const finalURL = `${URL}&key=${googleApiKey}`
    const finalURL = `http://maps.googleapis.com/maps/api/staticmap?size=800x400&center=USA&zoom=3&maptype=terrain&markers=color:green|size:mid|label:B|25.490587,-80.21023851&markers=color:green|size:mid|label:A|44.409286,-68.247501&markers=color:green|size:mid|label:M|46.86075416,-121.7043885&markers=color:green|size:mid|label:G|38.6258069,-90.1892508&markers=color:green|size:mid|label:M|37.23908345,-108.4624032&key=${googleApiKey}`
    const map = await finalURL
    return map
  }

}

export const mapsService = new MapsService()