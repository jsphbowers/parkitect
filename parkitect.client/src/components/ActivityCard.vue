<template>
  <div class="m-2 mx-4 selectable elevation-2" data-bs-toggle="modal" data-bs-target="#activity-modal"
    @click="setActiveActivity(activity?.nativeId)">
    <div class="card">
      <div class="row g-0">
        <div class="col-md-6">
          <img class="cardImg px-0 activityImgBorder" :src="activity?.images[0].url" alt="">
        </div>
        <div class="col-md-6">
          <div class="row h-100 justify-content-center align-items-end">
            <div class="p-2 col-11">
              <h4>{{ activity.title }}</h4>
              <h6>{{ activity.shortDescription }}</h6>
            </div>
            <div class="d-flex col-11 p-2">
              <h5 class="iconbg mx-2" v-if="activity.arePetsPermitted == 'true'" title="Pets permitted">
                <img
                  src="https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/pets-off-leash-black-22.svg"
                  alt="Pets permitted">
              </h5>
              <h5 class="iconbg mx-2" v-if="activity.arePetsPermittedWithRestrictions == 'true'"
                title="Pets permitted with restrictions">
                <img
                  src="https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/pets-on-leash-black-22.svg"
                  alt="Pets permitted with restrictions">
              </h5>
              <h5 class="iconbg mx-2" v-if="activity.doFeesApply == 'true'" title="Passes and Fees">
                <img
                  src="https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/passes-and-fees-black-22.svg"
                  alt="Passes and Fees">
              </h5>
              <h5 class="iconbg mx-2" v-if="activity.isReservationRequired == 'true'" title="Reservation Required">
                <img
                  src="https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/reservations-black-22.svg"
                  alt="Reservation required">
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ActiveCardModal id="activity-modal" />
</template>


<script>
import { ThingToDo } from "../models/ThingToDo.js";
import { parksService } from "../services/ParksServices.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import ActiveCardModal from "./ActiveCardModal.vue";

export default {
  props: {
    activity: { type: ThingToDo, required: true }
  },
  setup() {
    return {

      async setActiveActivity(activityId) {
        try {
          // logger.log(activityId)
          await parksService.setActiveActivity(activityId)
        } catch (error) {
          Pop.error(error.message)
          logger.error(error.message)
        }
      }
    };
  },
  components: { ActiveCardModal }
}
</script>


<style lang="scss" scoped>
.cardImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  max-height: 30vh;
  min-height: 30vh;
}



.activityImgBorder {
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.iconbg {
  border: 2px solid black;
  color: #ffff;
  border-radius: 10px;
  padding: 1vh;
  margin-bottom: 0%;
}

.card {
  --bs-card-border-width: 0px !important
}

.whiteIcon {
  color: white;
}
</style>