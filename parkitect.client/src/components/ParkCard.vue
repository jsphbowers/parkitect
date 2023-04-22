<template>
  <router-link
    :to="{ name: 'ParkDetails', params: { parkCode: park.parkCode } }"
  >
    <div class="my-2 card-shadow cardImg">
      <img
        class=""
        :src="park.images[0].url"
        :alt="park.name"
        />
        <!-- srcset="/blurs/blury.png" -->
      <div class="card-content">
        <h5 class="ps-2 mb-3">{{ park.name }}</h5>
        <div>
          <p class="ps-2">{{ park.states }}</p>
        </div>
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
    onMounted(() => {});
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
.cardImg {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

img {
  width: 100%;
  height: 35vh;
  object-fit: cover;
  object-position: center;
}
.cardImg::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 18%,
    rgba(0, 0, 0, 0.5) 99%,
    rgba(0, 0, 0, 0.5) 100%
  );
}
.card-content {
  position: absolute;
  bottom: 20px;
  left: 0;
  z-index: 2;
  color: #fff;
  width: 100%;
  transform: translateY(68%);
  transition: all 0.3s ease-in-out;
}
.card-content h5 {
  // font-size: 1em;
  display: block;
  margin-bottom: 1em;
  text-transform: capitalize;
  opacity: 0.9;
  line-height: 1.6;
  letter-spacing: 1px;
}

h5,
p {
  text-shadow: 1px 1px 1px black, 1px 2px 3px #222b22,
    -3px 2px 6px rgba(16, 25, 31, 0.3);
}
.card-content p {
  color: #fff;
  transition: all 0.3s ease-in-out;
  opacity: 0.9;
  line-height: 1.6;
  letter-spacing: 1px;
}
.card-shadow:hover {
  box-shadow: 5px 5px 18px 3px rgba(78, 77, 77, 0.8);
}
.cardImg:hover .card-content {
  transform: translateY(0);
}
</style>
