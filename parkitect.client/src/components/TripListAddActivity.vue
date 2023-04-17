<template>
  <div>
    <li><a class="dropdown-item selectable" @click="addActivityToTrip(tripName.id)">{{ tripName.name }}</a></li>
  </div>
  <!-- <li><a class="dropdown-item selectable" @click="addParkToTrip(tripName.id)">{{ tripName.name }}</a></li> -->
</template>


<script>
import { useRoute } from "vue-router";
import { Trip } from "../models/Trip.js";
import { tripsService } from "../services/TripsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { parksService } from "../services/ParksServices.js";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { onMounted, ref } from "vue";
import { tripParksService } from "../services/TripParksService.js"

export default {
  props: {
    tripName: { type: Trip, required: true }
  },
  setup(props) {

    async function getTripParks() {
      try {
        const tripId = props.tripName.id
        parkExists.value = await tripParksService.getTripParksByTripId(tripId)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error.message)
      }
    }
    const parkExists = ref(false)

    onMounted(() =>
      getTripParks()
    )
    return {
      hasThingToDo: computed(() => AppState.tripParks.find(tp => tp.nativeParkId == AppState.activePark.nativeId)),
      parkExists,

      async addActivityToTrip(tripId) {
        try {
          logger.log('[THIS IS THE TRIP ID FOR ADDING ACTIVITY]', tripId)
          const nativeThingToDoId = AppState.activeThingToDo.nativeId
          const title = AppState.activeThingToDo.title
          await tripsService.addActivityToTrip(tripId, nativeThingToDoId, title)
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>