<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-12">
        <h1>{{ trip?.name }}</h1>
      </div>
    </section>
  </div>
</template>


<script>
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { tripsService } from "../services/TripsService.js";
import { computed, onMounted, watchEffect } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    const route = useRoute()
    async function getMyTrip() {
      try {
        const tripId = route.params.tripId
        await tripsService.getMyTrip(tripId)
      } catch (error) {
        logger.log(error)
        Pop.error(error.message)
      }
    }

    watchEffect(() => {
      if (AppState.account?.id) {
        getMyTrip()
      }
    })
    return {
      trip: computed(() => AppState.activeTrip)
    }
  }
}
</script>


<style lang="scss" scoped></style>