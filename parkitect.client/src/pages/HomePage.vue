<template>
  <div class="container-fluid">
    <!-- SECTION search bar -->
    <section class="row justify-content-center align-items-center search-bg">
      <div class="col p-0 text-light text-center txt-shadow">
        <h1>Build your next National Park Journey!</h1>
        <form @submit.prevent="searchPark()" class="input-group mt-4">
          <input
            v-model="editable"
            type="text"
            class="form-control"
            placeholder="Search by park or state"
          />
          <button type="submit" class="input-group-text btn">Search</button>
        </form>
        <button
          v-if="account.id"
          class="btn btn-create selectable"
          data-bs-toggle="modal"
          data-bs-target="#tripModal"
        >
          Create a Trip
        </button>
      </div>
    </section>

    <!-- SECTION park cards -->
    <section class="row justify-content-center px-md-5">
      <div class="col-12 text-center my-4">
        <h2>
          {{ parks.length != 0 ? "Where do you want to go?" : "" }}
        </h2>
      </div>
      <div
        v-if="parks.length == 0 && !loading.parks"
        class="text-center no-results-guy"
      >
        <h2>We are sorry, but there are no search results</h2>
        <h1>¯\_(ツ)_/¯</h1>
        <br />
        <button @click="getParks()" class="btn btn-back mb-4">
          Back to all parks
        </button>
      </div>

      <div v-for="p in parks" :key="p.nativeId" class="col-md-4">
        <ParkCard :park="p" />
      </div>
    </section>

    <!-- SECTION pagination -->

    <section v-if="parks.length != 0" class="row justify-content-between pt-4">
      <div class="col-md-3 col-6">
        <button
          class="btn btn-underline selectable"
          :disabled="currentPage == 0"
          @click="changePage('decrease')"
        >
          Previous Page
        </button>
      </div>
      <div class="col-md-3 col-6 text-end">
        <button
          class="btn btn-underline selectable"
          :disabled="parks.length === 8"
          @click="changePage('increase')"
        >
          Next Page
        </button>
      </div>
    </section>

    <!-- SECTION about us -->
    <section class="row mt-5">
      <div class="col-12 px-md-5 bg-color">
        <router-link :to="{ name: 'About' }">
          <h2 class="text-center text-dark">About Us</h2>
        </router-link>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo, rem
          reiciendis maxime omnis porro, maiores cupiditate ipsam adipisci
          perspiciatis facere saepe quia, minima iste nisi explicabo aperiam at
          mollitia unde! Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Nemo magnam voluptatem ex error. Natus harum assumenda adipisci
          unde perspiciatis nisi aliquam esse ipsa blanditiis obcaecati, maiores
          modi eius non dolor!
        </p>
      </div>
    </section>
  </div>

  <SmallModalVue id="tripModal">
    <template #header>
      <div>Create Your Trip!</div>
    </template>
    <template #body>
      <CreateTripForm />
    </template>
  </SmallModalVue>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { parksService } from "../services/ParksServices.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import ParkCard from "../components/ParkCard.vue";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import SmallModalVue from "../components/SmallModal.vue";
import CreateTripForm from "../components/CreateTripForm.vue";

export default {
  setup() {
    const route = useRoute();
    const editable = ref("");

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

    onMounted(() => {
      getParks();
      // getParkByParkCode();
    });
    return {
      getParks,
      editable,
      coverImages,
      selectedImg: computed(() => {
        const randomIndex = Math.floor(Math.random() * coverImages.length);
        return `url(${coverImages[randomIndex]})`;
      }),
      parks: computed(() => AppState.parks),
      account: computed(() => AppState.account),
      loading: computed(() => AppState.loading),
      currentPage: computed(() => AppState.currentPage),
      total: computed(() => AppState.total),

      async searchPark() {
        try {
          const query = editable.value;
          // logger.log(query);
          await parksService.searchPark(query);
        } catch (error) {
          logger.log(error.message);
        }
      },

      async changePage(pageChange) {
        try {
          if (pageChange == "increase") {
            AppState.currentPage++;
            await parksService.changePage(pageChange);
          }
          if (pageChange == "decrease") {
            AppState.currentPage--;
            await parksService.changePage(pageChange);
          }
        } catch (error) {
          logger.log(error.message);
        }
      },
    };
  },
  components: { ParkCard, SmallModalVue, CreateTripForm },
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
  text-shadow: 1px 1px black, 1px 1px 2px #0970a3, -3px 1px 5px #009dff40;
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
  margin-top: 0.5em;
  font-weight: bolder;
  font-size: 1.25em;
  text-decoration: underline;
  text-shadow: 1px 1px black, 1px 1px 2px #1e4254, -3px 1px 5px #5f91b040;
}

.btn-underline {
  text-decoration: underline;
  border: none;
}

.btn-back {
  background-image: linear-gradient(rgb(150, 207, 36) 0%, rgb(0, 104, 56) 100%);
  color: white;
  border: 0;
}

.bg-color {
  background-color: #19875417;
  padding: 3em;
}

@media screen and (max-width: 480px) {
  .search-bg {
    min-height: 50vh;
  }
}

.no-results-guy {
  opacity: 0;
  animation: 0.2s 0.2s reveal forwards;
}

@keyframes reveal {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
