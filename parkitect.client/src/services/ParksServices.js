import { AppState } from "../AppState.js";
import { Park } from "../models/Park.js";
import { ThingToDo } from "../models/ThingToDo.js";
import { logger } from "../utils/Logger.js";
import { npsApi } from "./AxiosService.js";

let globalQuery = [];
let globalRegion = [];
class ParksService {

  async getParks() {
    AppState.loading.parks = true;
    const res = await npsApi.get(
      `/parks?parkcode=acad,npsa,arch,badl,bibe,bisc,blca,brca,cany,care,cave,chis,cong,crla,cuva,deva,dena,drto,ever,gaar,jeff,glac,glba,grca,grte,grba,grsa,grsm,gumo,hale,havo,hosp,indu,isro,jotr,katm,kefj,seki,kova,lacl,lavo,maca,meve,mora,neri,noca,olym,pefo,pinn,redw,romo,sagu,shen,thro,viis,voya,whsa,wica,wrst,yell,yose,zion&limit=9`
    );
    logger.log("Getting parks from NPS api", res.data);
    AppState.parks = res.data.data.map((p) => new Park(p));
    // logger.log("getting parks from appState", AppState.parks);
    AppState.loading.parks = false;
    AppState.currentPage = res.data.start
    AppState.total = res.data.total
  }

  async getParkByParkCode(parkCode) {
    const res = await npsApi.get(`/parks?parkCode=${parkCode}`);
    logger.log("Getting park by park code", res.data);
    // AppState.activePark = res.data.data.map((ap) => new Park(ap))
    AppState.activePark = new Park(res.data.data[0]);
    // logger.log("getting park by park code from appState", AppState.activePark);
    // logger.log("active park name", AppState.activePark[0].name)
  }

  async searchPark(query) {
    globalQuery = query
    const res = await npsApi.get(
      `/parks?parkcode=acad,npsa,arch,badl,bibe,bisc,blca,brca,cany,care,cave,chis,cong,crla,cuva,deva,dena,drto,ever,gaar,jeff,glac,glba,grca,grte,grba,grsa,grsm,gumo,hale,havo,hosp,indu,isro,jotr,katm,kefj,seki,kova,lacl,lavo,maca,meve,mora,neri,noca,olym,pefo,pinn,redw,romo,sagu,shen,thro,viis,voya,whsa,wica,wrst,yell,yose,zion&limit=9&q=${query}`
    );
    logger.log("[search park]", res.data);
    AppState.parks = res.data.data.map((p) => new Park(p));
  }

  async changeByRegion(region) {
    globalRegion = region
    const res = await npsApi.get(
      `/parks?parkcode=acad,npsa,arch,badl,bibe,bisc,blca,brca,cany,care,cave,chis,cong,crla,cuva,deva,dena,drto,ever,gaar,jeff,glac,glba,grca,grte,grba,grsa,grsm,gumo,hale,havo,hosp,indu,isro,jotr,katm,kefj,seki,kova,lacl,lavo,maca,meve,mora,neri,noca,olym,pefo,pinn,redw,romo,sagu,shen,thro,viis,voya,whsa,wica,wrst,yell,yose,zion&limit=9&stateCode=${region}`
    );
    logger.log('[Park Data for region]', res.data)
    AppState.parks = res.data.data.map((p) => new Park(p));
  }

  async getThingsToDo(parkCode) {
    const res = await npsApi.get(`/thingstodo?parkCode=${parkCode}`);
    logger.log("[THE THINGS TO DO FROM npsAPI]", res.data);
    AppState.thingsToDo = res.data.data.map((th) => new ThingToDo(th));
    const newe = AppState.thingsToDo.filter((thing) =>
      thing.activities[0].name.toLowerCase().includes("snow")
    );

    logger.log(newe);
  }

  async setActiveActivity(activityId) {
    const activeActivity = AppState.thingsToDo.find(t => t.nativeId == activityId)
    AppState.activeThingToDo = activeActivity
    logger.log('[THIS IS THE ACTIVE THING TO DO]', AppState.activeThingToDo)
  }

  async changePage(pageChange) {
    const currentPage = AppState.currentPage;
    if (pageChange == 'increase') {
      AppState.start += 9
    } else {
      AppState.start -= 9
    }
    if (AppState.allPageChange == true) {
      const res = await npsApi.get(
        `/parks?parkcode=acad,npsa,arch,badl,bibe,bisc,blca,brca,cany,care,cave,chis,cong,crla,cuva,deva,dena,drto,ever,gaar,jeff,glac,glba,grca,grte,grba,grsa,grsm,gumo,hale,havo,hosp,indu,isro,jotr,katm,kefj,seki,kova,lacl,lavo,maca,meve,mora,neri,noca,olym,pefo,pinn,redw,romo,sagu,shen,thro,viis,voya,whsa,wica,wrst,yell,yose,zion&start=${AppState.start}&limit=9`
      );
      AppState.parks = res.data.data.map((p) => new Park(p));
      logger.log('next page parks', AppState.parks)
      // AppState.total = res.data.total;
    }
    if (AppState.searchPageChange == true) {
      const res = await npsApi.get(
        `/parks?parkcode=acad,npsa,arch,badl,bibe,bisc,blca,brca,cany,care,cave,chis,cong,crla,cuva,deva,dena,drto,ever,gaar,jeff,glac,glba,grca,grte,grba,grsa,grsm,gumo,hale,havo,hosp,indu,isro,jotr,katm,kefj,seki,kova,lacl,lavo,maca,meve,mora,neri,noca,olym,pefo,pinn,redw,romo,sagu,shen,thro,viis,voya,whsa,wica,wrst,yell,yose,zion&start=${AppState.start}&limit=9&q=${globalQuery}`
      );
      AppState.parks = res.data.data.map((p) => new Park(p));
    }

    if (AppState.regionPageChange == true) {
      const res = await npsApi.get(
        `/parks?parkcode=acad,npsa,arch,badl,bibe,bisc,blca,brca,cany,care,cave,chis,cong,crla,cuva,deva,dena,drto,ever,gaar,jeff,glac,glba,grca,grte,grba,grsa,grsm,gumo,hale,havo,hosp,indu,isro,jotr,katm,kefj,seki,kova,lacl,lavo,maca,meve,mora,neri,noca,olym,pefo,pinn,redw,romo,sagu,shen,thro,viis,voya,whsa,wica,wrst,yell,yose,zion&start=${AppState.start}&limit=9&stateCode=${globalRegion}`
      );
      AppState.parks = res.data.data.map((p) => new Park(p));
    }



    AppState.parks = res.data.data.map((p) => new Park(p));
    logger.log('next page parks', AppState.parks)
    AppState.total = res.data.total;
  }
}

export const parksService = new ParksService();
