<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <!-- cover photo -->
      <div class="col-12 p-0">
        <img v-if="trip" :src="trip?.coverImg" :alt="'cover image for ' + trip?.name" class="cover-img">
      </div>
      <!-- trip details card -->
      <div class="col-md-11 text-center trip-details-card">
        <h1>{{ trip?.name }}</h1>
        <h2>{{ trip?.description }}</h2>
      </div>
      <!-- tripGoers photos -->
      <div class="col-md-11 d-flex">
        <div v-for="t in tripGoers" :key="t.id">
          <img :src="t.account.picture" :alt="'a photo of ' + t.account.name" :title="t.account.name" class="profile-pic">
        </div>
      </div>
      <!-- tripParks and tripThingsToDo -->
      <div class="col-md-11">
        <section class="row mb-4" v-for="t in tripParks" :key="t.id">
          <div class="col-md-7">
            <h1>{{ t.fullName }}</h1>
            <img :src="t.image" :alt="'a photo of ' + t.fullName" class="park-img">
          </div>
          <div class="col-md-5">
            <h3 class="mt-md-5 mt-2">Activities</h3>
            <ul v-if="dictionary[t.parkCode]">
              <span v-for="ttd in dictionary[t.parkCode]" :key="ttd.id">
                <li v-if="ttd.parkCode == t.parkCode" class="selectable" data-bs-toggle="modal"
                  data-bs-target="#exampleModal" @click="setActiveThingToDo(ttd.nativeThingToDoId)">{{ ttd.title }}</li>
              </span>
            </ul>
            <h6 v-else>No activities have been added for this park</h6>
          </div>
        </section>
      </div>
    </section>
  </div>
  <ActiveCardModal />
</template>

<!-- FIXME add ActivityCardModal onto each thingToDo. It originates in ActivityCard.vue -->


<script>
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { tripsService } from "../services/TripsService.js";
import { tripGoersService } from "../services/TripGoersService.js";
import { tripParksService } from "../services/TripParksService.js";
import { tripThingsToDoService } from "../services/TripThingsToDoService.js";
import { computed, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import ActiveCardModal from "../components/ActiveCardModal.vue";
import { parksService } from "../services/ParksServices.js";

export default {
  setup() {
    const route = useRoute();
    async function getMyTrip() {
      try {
        const tripId = route.params.tripId;
        await tripsService.getMyTrip(tripId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }
    async function getTripGoersByTripId() {
      try {
        const tripId = route.params.tripId;
        await tripGoersService.getTripGoersByTripId(tripId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }
    async function getTripThingsToDoByTripId() {
      try {
        const tripId = route.params.tripId;
        await tripThingsToDoService.getTripThingsToDoByTripId(tripId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }
    async function getTripParksByTripId() {
      try {
        const tripId = route.params.tripId;
        await tripParksService.getTripParksByTripId(tripId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }
    watchEffect(() => {
      if (AppState.account?.id) {
        getMyTrip();
        getTripGoersByTripId();
        getTripThingsToDoByTripId();
        getTripParksByTripId();
      }
    });
    return {
      trip: computed(() => AppState.activeTrip),
      tripGoers: computed(() => AppState.tripGoers),
      tripParks: computed(() => AppState.tripParks),
      dictionary: computed(() => AppState.dictionary),

      async setActiveThingToDo(nativeThingToDoId) {
        try {
          await tripThingsToDoService.setActiveThingToDo(nativeThingToDoId)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      }
    };
  },
  components: { ActiveCardModal }
}
</script>


<style lang="scss" scoped>
.trip-details-card {
  min-height: 20vh;
  background-color: rgba(217, 217, 217, 0.29);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2em;
}

.profile-pic {
  border-radius: 100%;
  margin: .5em;
  height: 10vh;
  width: 10vh;
  object-fit: cover;
  object-position: center
}

.cover-img {
  width: 100%;
  height: 45vh;
  object-fit: cover;
  object-position: center
}

.park-img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 45vh
}
</style>