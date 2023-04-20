<template>
  <section class="row" v-for="p in tripParks" :key="p.id">
    <div class="col-12">
      <div class="d-flex justify-content-between">
        <h4>{{ p.fullName }}</h4>
        <button class="btn p-0" title="Delete Park from Trip" @click="removeParkFromTrip(p.id, p.parkCode)"><i
            class="mdi mdi-delete-outline text-danger fs-5"></i></button>
      </div>
      <img :src="p.image" :alt="'a photo of ' + p.fullName" class="park-image">
    </div>
    <div class="col-12 mb-3">

      <h5 v-if="tripThingsToDo.filter(ttd => ttd.parkCode == p.parkCode).length">Activities - Click to remove from trip
      </h5>
      <ul v-if="tripThingsToDo.filter(ttd => ttd.parkCode == p.parkCode).length" class="text-danger">
        <span v-for="ttd in tripThingsToDo.filter(ttd => ttd.parkCode == p.parkCode)" :key="ttd.id">
          <li title="Remove activity from trip" v-if="ttd.parkCode == p.parkCode" class="selectable" @click="removeThingToDoFromTrip(ttd.id, ttd.parkCode)">
            {{ ttd.title
            }}
          </li>
        </span>
      </ul>
      <h6 v-else>No activities have been added for this park</h6>
    </div>
  </section>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { useRoute } from "vue-router";
import { tripThingsToDoService } from "../services/TripThingsToDoService.js";
import { tripParksService } from "../services/TripParksService.js";

export default {
  setup() {
    const route = useRoute()
    return {
      tripParks: computed(() => AppState.tripParks),
      tripThingsToDo: computed(() => AppState.tripThingsToDo),

      async removeThingToDoFromTrip(thingToDoId, parkCode) {
        try {
          if (await Pop.confirm("Are you sure you want to delete this activity?", "This action cannot be undone", "Yes, I'm sure", "warning")) {
            const tripId = route.params.tripId
            await tripThingsToDoService.removeThingToDoFromTrip(tripId, thingToDoId, parkCode)
          }
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },

      async removeParkFromTrip(tripParkId, parkCode) {
        try {
          if (await Pop.confirm("Are you sure you want to delete this park?", "This action cannot be undone", "Yes, I'm sure", "warning")) {
            const tripId = route.params.tripId
            await tripParksService.removeParkFromTrip(tripId, tripParkId, parkCode)
          }
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.park-image {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 25vh;
  margin-bottom: 1em
}
</style>