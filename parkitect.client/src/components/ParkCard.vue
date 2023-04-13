<template>
  <router-link :to="{ name: 'ParkDetails', params: { parkCode: park.parkCode } }">
    <div class="card mb-3 elevation-4">
      <img class="cardImg rounded-top" :src="park.images[0].url" :alt="park.name" />
      <div class="p-2">
        <h6 class="m-0">{{ park.name }}</h6>
        <h6>{{ park.states }}</h6>
      </div>
    </div>
  </router-link>
</template>

<script>
import { computed, onMounted } from "vue";
import { Park } from "../models/Park.js";

export default {
  props: {
    park: { type: Park, required: true },
  },

  setup() {
    onMounted(() => {

    });
    return {};
  },
};
</script>

<style lang="scss" scoped>
.cardImg {
  width: 100%;
  height: 30vh;
  object-fit: cover;
  object-position: center;
}
</style>
