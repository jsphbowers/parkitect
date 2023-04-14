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
    <section class="row justify-content-center px-5">
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
      </div>
      <div v-for="p in parks" :key="p.nativeId" class="col-md-4">
        <ParkCard :park="p" />
      </div>
    </section>

    <!-- SECTION pagination -->

    <section class="row justify-content-between">
      <div class="col-3">
        <button
          class="btn btn-underline"
          @click="changePage('decrease')"
          >
          Previous Page
        </button>
        <!-- :disabled="currentPage == 1" -->
      </div>
      <div class="col-3 text-end">
        <button
          class="btn btn-underline"
          @click="changePage('increase')"
          >
          Next Page
        </button>
        <!-- :disabled="currentPage == total" -->
      </div>
    </section>

    <!-- SECTION about us -->
    <section class="row"></section>
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
      totalPages: computed(() => AppState.totalPages),

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
          // logger.log('change page')
          if (pageChange == 'increase' ) {
            AppState.currentPage++
          }
          if (pageChange == 'decrease' ) {
            AppState.currentPage--
          }
          await parksService.changePage()
        } catch (error) {
          logger.log(error.message);
        }
      }
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
}

@media screen and (max-width: 480px) {
  .search-bg {
    min-height: 40vh;
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
