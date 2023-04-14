<template>
  <li><a class="dropdown-item selectable" @click="addParkToTrip(tripName.id)">{{ tripName.name }}</a></li>
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
import { onMounted } from "vue";

export default {
  props: {
    tripName: { type: Trip, required: true }
  },
  setup() {

    async function getTripParks() {
      try {
        const nativeParkId = AppState.activePark.nativeId
        await tripsService.getTripParks(nativeParkId)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error.message)
      }
    }

    onMounted(() => getTripParks())
    return {
      // parkOnPage: computed(() => AppState.activePark),

      async addParkToTrip(tripId) {
        try {
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