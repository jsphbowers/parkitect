<template>
  <div v-if="!hasActivity && tripName.isArchived == false">
    <li><a class="dropdown-item selectable" title="Add activity to your trip" @click="addActivityToTrip(tripName.id)">{{
      tripName.name }}</a></li>
  </div>
  <div v-else-if="hasActivity">
    <li><a class="dropdown-item text-danger" title="This activity is already added to this trip">{{ tripName.name }}</a>
    </li>
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
import { tripThingsToDoService } from "../services/TripThingsToDoService.js";

export default {
  props: {
    tripName: { type: Trip, required: true }
  },
  setup(props) {

    async function getTripThingsToDo() {
      try {
        const tripId = props.tripName.id
        await tripThingsToDoService.getThingsToDoForActivityList(tripId)
      } catch (error) {
        Pop.error(error.message)
        logger.error(error.message)
      }
    }

    onMounted(() =>
      getTripThingsToDo()
    )
    return {
      props,
      hasActivity: computed(() => AppState.dictThingsToDo[props.tripName.id]?.find(a => a.nativeThingToDoId == AppState.activeThingToDo?.nativeId)),
      parkExists: computed(() => AppState.dictTripParks[props.tripName.id]?.find(p => p.nativeParkId == AppState.activePark.nativeId)),

      async addActivityToTrip(tripId) {
        try {
          if (!this.parkExists && await Pop.confirm('This park is currently not included on this trip do you want to add it?', '')) {
            const nativeParkId = AppState.activePark.nativeId
            const fullName = AppState.activePark.name
            await tripsService.addParkToTrip(tripId, nativeParkId, fullName)
            logger.log('[THIS IS THE TRIP ID FOR ADDING ACTIVITY]', tripId)
            logger.log('[THIS IS AFTER THE PARK HAS BEEN ADDED]')
            const nativeThingToDoId = AppState.activeThingToDo.nativeId
            const title = AppState.activeThingToDo.title
            await tripsService.addActivityToTrip(tripId, nativeThingToDoId, title)
            Pop.toast(`Activity Added and Park to ${props.tripName.name}`, 'success', 'top')
          } else if (this.parkExists) {
            logger.log('[THIS IS THE TRIP ID FOR ADDING ACTIVITY]', tripId)
            const nativeThingToDoId = AppState.activeThingToDo.nativeId
            const title = AppState.activeThingToDo.title
            await tripsService.addActivityToTrip(tripId, nativeThingToDoId, title)
            Pop.toast(`Activity Added to ${props.tripName.name}`, 'success', 'top')
          }
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