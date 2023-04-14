<template>
  <div class="col-md-3 trip-sizing d-flex justify-content-center">
    <div class="create-trip test-trip justify-content-center align-items-center d-flex selectable">
      <h3 class="ms-2 mt-2 trip-text">Family vacay</h3>
    </div>
  </div>
</template>


<script>
import { Trip } from "../models/Trip.js";

export default {
  // props: {
  //   trip: { type: Trip, required: true }
  // },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped></style>