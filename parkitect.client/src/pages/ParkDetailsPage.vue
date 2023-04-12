<template>
  <!-- SECTION Cover Photo with title  -->
  <!-- SECTION Description -->
  <!-- SECTION Popular Activities with filter bar or buttons-->
  <section class="row"></section>
  <!-- SECTION footer -->
</template>


<script>
import { router } from "../router.js";
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const route = useRoute()

    async function getThingsToDo() {
      try {
        // NOTE used parkId here 
        const tripId = route.params.parkId
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }

    }
    return {}
  }
}
</script>


<style lang="scss" scoped></style>