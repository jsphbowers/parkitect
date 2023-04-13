<template>
  <div class="container-fluid">
    <!-- SECTION search bar -->
    <section class="row justify-content-center align-items-center search-bg">
      <div class="col p-0 text-light text-center txt-shadow">
      <h1>Build your next National Park Journey!</h1>
      <div class="input-group mt-4">
        <input type="text" class="form-control" placeholder="Search by State">
          <button type="submit" class="input-group-text btn">Search</button>
      </div>
      <button class="btn btn-create selectable">Create a Trip</button>
      </div>
    </section>

    <!-- SECTION park cards -->
    <section class="row ">
      <div class="col-12 text-center my-4">
        <h2>Where do you want to go?</h2>
      </div>
      <div v-for="p in parks" :key="p.nativeId" class="col-md-4">
        <ParkCard :park="p" />
      </div>
    </section>

    <!-- SECTION about us -->
    <section class="row"></section>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { parksService } from "../services/ParksServices.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import ParkCard from "../components/ParkCard.vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    const coverImages = [
      "src/assets/img/HomePagePics/picture1.jpg",
      "src/assets/img/HomePagePics/picture2.jpg",
      "src/assets/img/HomePagePics/picture3.jpg",
      "src/assets/img/HomePagePics/picture4.jpg",
      "src/assets/img/HomePagePics/picture5.jpg",
      "src/assets/img/HomePagePics/picture6.jpg",
      "src/assets/img/HomePagePics/picture7.jpg",
    ];
    async function getParks() {
      try {
        // logger.log('getting all parks')
        await parksService.getParks();
      } catch (error) {
        Pop.error(error);
        logger.log(error);
      }
    }
    async function getParkByParkCode(parkCode) {
      try {
        await parksService.getParkByParkCode(parkCode);
      } catch (error) {
        Pop.error(error);
        logger.log(error);
      }
    }
    // TODO finish fn for search
    // async function searchParks() {
    //   const query
    // }
    onMounted(() => {
      getParks();
      getParkByParkCode("yell");
    });
    return {
      coverImages,
      selectedImg: computed(() => {
        const randomIndex = Math.floor(Math.random() * coverImages.length);
        return `url(${coverImages[randomIndex]})`;
      }),
      parks: computed(() => AppState.parks),
    };
  },
  components: { ParkCard },
};
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
}

.search-bg {
  background-image: v-bind(selectedImg);
  background-position: center;
  background-size: cover;
  min-height: 60vh;
}

.txt-shadow {
  text-shadow: 1px 1px black,
    1px 1px 2px #0970a3,
    -3px 1px 5px #009dff40;
}

.input-group {
  width: 80%;
  max-width: 500px;
  border-radius: 30px;
  background: #ffff;
  margin: auto;
  padding: 2px;
}

.form-control {
  border: 0;
  border-radius: 30px !important;
  margin: 2px;
  box-shadow: none;
}

.input-group-text {
  width: 100px;
  background-image: linear-gradient(rgb(150, 207, 36) 0%, rgb(0, 104, 56) 100%);
  border: 0;
  color: #ffff;
  padding: 0 25px;
  border-radius: 30px;
  box-shadow: none;
  border-top-left-radius: 30px !important;
  border-bottom-left-radius: 30px !important;
}

.btn-create {
  border: none;
  color: #ffff;
  margin-top: .5em;
  font-weight: bolder;
  font-size: 1.25em;
  text-decoration: underline;
  text-shadow: 1px 1px black,
    1px 1px 2px #1e4254,
    -3px 1px 5px #5f91b040;
}


@media screen and (max-width: 480px) {
  .search-bg {
  min-height: 40vh;
  }
}
</style>
