<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <!-- cover photo -->
      <div class="col-12 p-0">
        <img v-if="trip" :src="trip?.coverImg" :alt="'cover image for ' + trip?.name" class="cover-img">
      </div>
      <div class="d-flex justify-content-end mt-2 mb-0">
        <button class="btn addBtn" data-bs-toggle="modal" data-bs-target="#editTripModal">Edit Trip</button>
      </div>
      <!-- trip details card -->
      <div class="col-md-11 text-center trip-details-card">
        <h1>{{ trip?.name }}</h1>
        <h5>{{ trip?.description }}</h5>
      </div>
      <!-- tripGoers photos -->
      <h3 class="mb-0">Who's coming along...</h3>
      <div class="col-md-11 trip-goers-card">
        <div v-for="t in tripGoers" :key="t.id">
          <img :src="t.account.picture" :alt="'a photo of ' + t.account.name" :title="t.account.name" class="profile-pic">
        </div>
      </div>
      <!-- tripParks -->
      <h3 class="mb-0">Sights to see & things to do!</h3>
      <div class="col-md-11 parks-area">
        <section class="row mb-4" v-for="t in tripParks" :key="t.id">
          <div class="col-md-7">
            <h1>{{ t.fullName }}</h1>
            <img :src="t.image" :alt="'a photo of ' + t.fullName" class="park-img">
          </div>
          <!-- tripThingsToDo -->
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


  <div class="modal fade" id="editTripModal" tabindex="-1" aria-labelledby="editTripLabel" aria-hidden="true">
    <div class="modal-dialog">
      <form>
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editTripLabel">Edit Your Trip</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-floating">
              <input type="text" id="name" name="name" class="form-control mb-2" minlength="3" maxlength="25"
                v-model="editable.name">
              <label for="name">Name</label>
            </div>
            <div class="form-floating">
              <input type="url" name="image url" id="coverImgUrl" class="form-control mb-2" v-model="editable.coverImg">
              <label for="coverImgUrl">Cover Image URL</label>
            </div>
            <div class="form-floating">
              <textarea class="form-control" id="description" name="description" style="height: 100px" minlength="5"
                maxlength="1000" v-model="editable.description"></textarea>
              <label for="description">Description</label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn addBtn">Save changes</button>
          </div>
        </div>
      </form>
    </div>
  </div>

  <ActiveCardModal />
</template>

<script>
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { tripsService } from "../services/TripsService.js";
import { tripGoersService } from "../services/TripGoersService.js";
import { tripParksService } from "../services/TripParksService.js";
import { tripThingsToDoService } from "../services/TripThingsToDoService.js";
import { computed, ref, watch, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import ActiveCardModal from "../components/ActiveCardModal.vue";
import { parksService } from "../services/ParksServices.js";

export default {
  setup() {
    const route = useRoute();
    const editable = ref({});
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
      };
      if (AppState.activeTrip) {
        editable.value = { ...AppState.activeTrip }
      }
    });


    return {
      editable,
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
  margin-top: 1em;
  margin-bottom: 1em;
}

.addBtn {
  background-image: linear-gradient(rgb(150, 207, 36) 0%, #006838 100%);
  border: 0;
  color: white;
  border-radius: 10px;
  padding: 1vh;
}

.trip-goers-card {
  min-height: 12vh;
  background-color: rgba(217, 217, 217, 0.29);
  display: flex;
  align-items: center;
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: .25em;
  padding-right: .25em;
}

.profile-pic {
  border-radius: 100%;
  margin-left: .25em;
  margin-right: .25em;
  margin-top: .5em;
  margin-bottom: .5em;
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

.parks-area {
  margin-top: 1em;
  margin-bottom: 1.5em;
}

.park-img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 45vh
}
</style>