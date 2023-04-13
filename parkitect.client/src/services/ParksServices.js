import { AppState } from "../AppState.js";
import { Park } from "../models/Park.js";
import { ThingToDo } from "../models/ThingToDo.js";
import { logger } from "../utils/Logger.js";
import { npsApi } from "./AxiosService.js";

export class ParksService {
  async getParks() {
    const res = await npsApi.get(
      `/parks?parkcode=acad,npsa,arch,badl,bibe,bisc,blca,brca,cany,care,cave,chis,cong,crla,cuva,deva,dena,drto,ever,gaar,jeff,glac,glba,grca,grte,grba,grsa,grsm,gumo,hale,havo,hosp,indu,isro,jotr,katm,kefj,seki,kova,lacl,lavo,maca,meve,mora,neri,noca,olym,pefo,pinn,redw,romo,sagu,shen,thro,viis,voya,whsa,wica,wrst,yell,yose,zion&limit=62`
    );
    logger.log("Getting parks from NPS api", res.data);
    AppState.parks = res.data.data.map((p) => new Park(p));
    logger.log("getting parks from appState", AppState.parks);
  }

  async getParkByParkCode(parkCode) {
    const res = await npsApi.get(`/parks?parkCode=${parkCode}`);
    logger.log("Getting park by park code", res.data);
    AppState.activePark = res.data.data.map((ap) => new Park(ap))
    logger.log("getting park by park code from appState", AppState.activePark);
  }

  async getThingsToDo(parkCode) {
    const res = await npsApi.get(`/thingstodo?parkCode=${parkCode}`)
    logger.log('[THE THINGS TO DO FROM npsAPI]', res.data)
    AppState.thingsToDo = res.data.data.map((th) => new ThingToDo(th))
    const newe = AppState.thingsToDo.filter(thing => thing.activities[0].name.toLowerCase().includes('snow'))

    logger.log(newe)
  }
}

export const parksService = new ParksService();
