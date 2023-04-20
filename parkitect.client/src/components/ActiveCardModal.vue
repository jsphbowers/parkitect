<template>
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button> -->

  <!-- Modal -->
  <div class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ activity?.title }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body container-fluid">
          <img class="modalCardImg" :src="activity?.images[0].url" :alt="activity?.images[0].altText">
          <section class="row p-3">
            <div class="col-md-4">
              <h5>Type: {{ activity?.activities[0].name }}</h5>
              <h6 v-if="activity?.duration"> Typically takes {{ activity?.duration }}:</h6>
              <h6 v-html="activity?.durationDescription"></h6>
              <div class="py-2" v-if="activity?.season.length != 0">
                <h5>Seasons:</h5>
                <h6>
                  <img class="m-3 iconbg" v-for="season in seasons" :src="season" alt="">
                </h6>
              </div>
              <div class="py-2" v-if="activity?.timeOfDay.length != 0">
                <h5>Times of Day:</h5>
                <ul v-if="activity?.timeOfDay">
                  <li v-for="time in activity?.timeOfDay">{{ time }}</li>
                </ul>
              </div>
            </div>
            <div class="col-md-8">
              <h4>Description:</h4>
              <h6 v-html="activity?.longDescription">
              </h6>
            </div>
          </section>
        </div>
        <div class="modal-footer" v-if="account?.id">
          <div class="dropdown" v-if="account?.id">
            <button class="btn addBtn dropdown-toggle" v-if="route.name != 'TripDetails'" type="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              Add Activity
            </button>
            <ul class="dropdown-menu">
              <div v-for="trip in myTrips" :key="trip.id">
                <TripListAddActivity :tripName="trip" />
              </div>
              <li><a class="dropdown-item selectable" data-bs-toggle="modal" data-bs-target="#tripModal">Create Trip</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { tripsService } from "../services/TripsService.js"
import TripListAddActivity from "./TripListAddActivity.vue";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";

export default {
  setup() {
    return {
      activity: computed(() => AppState.activeThingToDo),
      account: computed(() => AppState.account),
      myTrips: computed(() => AppState.trips),
      seasons: computed(() => AppState.activeThingToDo?.season.map(at => {
        if (at == 'Winter') {
          return ('https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/winter-recreation-area-black-22.svg')
        }
        if (at == 'Spring') {
          return ("https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/flower-viewing-black-22.svg")
        }
        if (at == 'Summer') {
          return ("https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/sunny-black-22.svg")
        }
        if (at == 'Fall') {
          return ("https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/wilderness-black-22.svg")
        }

      })),

      route: useRoute(),
      async addActivity(activityId) {
        try {
          // logger.log(activityId)
          await tripsService.addActivity(activityId);
        }
        catch (error) {
          Pop.error(error.message);
          logger.error(error);
        }
      }
    };
  },
  components: { TripListAddActivity }
}
</script>


<style lang="scss" scoped>
.addBtn {
  background-image: linear-gradient(rgb(150, 207, 36) 0%, #006838 100%);
  border: 0;
  color: #ffff;
  border-radius: 10px;
  padding: 1vh;
  margin-bottom: 0%;
}

.iconbg {
  background-image: linear-gradient(rgb(150, 207, 36) 0%, #006838 100%);
  border: 0;
  color: #ffff;
  border-radius: 10px;
  padding: 1vh;
  margin-bottom: 0%;
}

.modalCardImg {
  width: 100%;
  height: 80vh;
  object-fit: cover;
  object-position: center;
}
</style>