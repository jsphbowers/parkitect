<template>
  <router-link :to="{ name: 'TripDetails', params: { tripId: tripGoer?.tripId } }">
    <section v-if="tripGoer.trip.isArchived == false">
      <div class="create-trip test-trip justify-content-center align-items-center d-flex selectable"
        :style="{ backgroundImage: `url(${tripGoer.trip.coverImg})`, backgroundPosition: 'center', backgroundSize: 'cover' }"
        :title="tripGoer.trip.description">
        <h3 class="ms-2 mt-2 trip-text text-center">{{ tripGoer.trip.name }}</h3>
        <img class="creatorPic elevation-2" :src="tripGoer?.trip.tripCreator?.picture"
          :alt="tripGoer?.trip.tripCreator?.name">
      </div>
    </section>
    <section v-if="tripGoer.trip.isArchived == true" class="positioning">
      <div class="create-trip test-trip justify-content-center align-items-center d-flex selectable archivedImg"
        :style="{ backgroundImage: `url(${tripGoer.trip.coverImg})`, backgroundPosition: 'center', backgroundSize: 'cover' }"
        :title="tripGoer.trip.description">
        <h3 class="ms-2 mt-2 trip-text text-center">{{ tripGoer.trip.name }}</h3>
      </div>
      <img class="archivedStamp"
        src="src\assets\img\archives-text-on-red-round-grungy-texture-stamp-2F1ER4R-removebg-preview.png" alt="Archived">
      <img class="creatorPic elevation-2" :src="tripGoer?.trip.tripCreator?.picture"
        :alt="tripGoer?.trip.tripCreator?.name">
    </section>
  </router-link>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import { Trip } from "../models/Trip.js";
import { TripGoer } from "../models/TripGoer.js";
import { logger } from "../utils/Logger.js";

export default {
  props: {
    tripGoer: { type: TripGoer, required: true }
  },
  setup() {

    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>
.trip-text {
  color: white;
  text-shadow: 3px 3px 1px black;
  /* backdrop-filter: invert(100%); */
  backdrop-filter: blur(4px);
  padding: 1vh;

}

.create-trip {
  height: 30vh;
  width: 30vh;
  border: 3px solid black;
  font-size: 70px;
  font-weight: 300;
  /* box-shadow: 3px 3px 6px black; */
  border-radius: 8px;
  border: 3px solid rgb(0, 0, 0);
  /* box-shadow: 10px -10px 0 -3px rgb(230, 230, 230), 10px -10px rgb(0, 0, 0), 20px -20px 0 -3px rgb(230, 230, 230), 20px -20px rgb(0, 0, 0); */
  box-shadow: 5px -5px 0 -1.5px rgb(230, 230, 230), 5px -5px rgb(0, 0, 0), 10px -10px 0 -1.5px rgb(230, 230, 230), 10px -10px rgb(0, 0, 0);
}

.archivedImg {
  filter: grayscale(100%);
}

.positioning {
  position: relative;
}

.archivedStamp {
  height: 9vh;
  width: 9vh;
  position: absolute;
  bottom: 3%;
  right: 3%;
  backdrop-filter: blur(4px);
  background-color: black;
  border-radius: 50%;
}

.creatorPic {
  height: 5vh;
  width: 5vh;
  position: absolute;
  backdrop-filter: blur(4px);
  border-radius: 50%;
  bottom: 4%;
  left: 4%;
  border: 2px black solid;
  object-fit: cover;
  object-position: center;
}

@media(max-width:992px) {

  .trip-text {
    color: white;
    text-shadow: 3px 3px 1px black;
    /* backdrop-filter: invert(100%); */
    backdrop-filter: blur(4px);
    padding: 1vh;
    font-size: 20px;

  }

  .trip-sizing {
    justify-content: center;
    display: flex;
    margin-bottom: 5vh;
  }


}
</style>