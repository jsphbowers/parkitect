<template>
  <!-- {{ parks }} -->
</template>

<script>
import { onMounted } from "vue";
import { parksService } from "../services/ParksServices.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {

    async function getParks() {
      try {
        // logger.log('getting all parks')
        await parksService.getParks();
      } catch (error) {
        Pop.error(error);
        logger.log(error)
      }
    }

    async function getParkByParkCode(parkCode) {
      try {
        await parksService.getParkByParkCode(parkCode);
      } catch (error) {
        Pop.error(error);
        logger.log(error)
      }
    }

    // TODO finish fn for search
    // async function searchParks() {
    //   const query
    // }

    onMounted(() => {
      getParks()
      getParkByParkCode('yell')
    })
    return {};
  },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
