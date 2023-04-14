<template>
  <div class="col-md-3 trip-sizing d-flex justify-content-center">
    <router-link :to="{ name: 'TripDetails', params: { tripId: tripGoer.tripId } }">
      <div class="create-trip test-trip justify-content-center align-items-center d-flex selectable"
        :style="{ backgroundImage: `url(${tripGoer.trip.coverImg})` }">
        <h3 class="ms-2 mt-2 trip-text">{{ tripGoer.trip.name }}</h3>
      </div>
    </router-link>
  </div>
</template>


<script>
import { Trip } from "../models/Trip.js";
import { TripGoer } from "../models/TripGoer.js";

export default {
  props: {
    tripGoer: { type: TripGoer, required: true }
  },
  setup() {
    return {}
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

@media(max-width:992px) {

  .trip-sizing {
    justify-content: center;
    display: flex;
    margin-bottom: 5vh;
  }

}
</style>