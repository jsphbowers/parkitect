<template>
  <div v-if="!parkExists">
    <li><a class="dropdown-item selectable" @click="addParkToTrip(tripName.id)">{{ tripName.name }}</a></li>
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
        await tripParksService.getListTripParks(tripId)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error.message)
      }
    }

    onMounted(() =>
      getTripParks()
    )
    return {
      parkExists: computed(() => AppState.dictTripParks[props.tripName.id]?.find(p => p.nativeParkId == AppState.activePark.nativeId)),

      async addParkToTrip(tripId) {
        try {
          // logger.log('[THIS IS THE TRIP ID]', tripId)
          const nativeParkId = AppState.activePark.nativeId
          const fullName = AppState.activePark.name
          await tripsService.addParkToTrip(tripId, nativeParkId, fullName)
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