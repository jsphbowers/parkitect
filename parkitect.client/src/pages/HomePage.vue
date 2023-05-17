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
            minlength="2"
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

    <section class="row justify-content-center px-md-5">
      <div class="col-md-4 text-center my-4 order-md-1 order-3">
        <button
          class="btn selectable"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#demoTrip"
        >
          Need help?
        </button>
      </div>
      <div class="col-md-4 text-center my-4 order-md-2 order-2">
        <h2>
          {{ parks.length != 0 ? "Where do you want to go?" : "" }}
        </h2>
      </div>
      <div class="col-md-4 d-flex jc my-md-4 order-md-3 order-2">
        <div v-if="parks.length != 0" class="dropdown">
          <button
            class="btn dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter by region
          </button>
          <ul class="dropdown-menu">
            <li>
              <a
                class="dropdown-item"
                @click="
                  changeByRegion([
                    'WA,OR,ID,AK,CA,AZ,NV,MT,WY,UT,CO,ND,SD,MN,NE,KS,MO,IA,WI,IL,OH,MI,TX,NM,OK,AR,LA,PA,WV,VA,MD,NJ,DE,MS,TN,KY,GA,SC,NC,FL,HI,VI,AS,NY,VT,NH,ME,RI,CT,MA',
                  ])
                "
                href="#"
                >All Parks</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="changeByRegion(['NY,VT,NH,ME,RI,CT,MA'])"
                href="#"
                >North Atlantic Region</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="changeByRegion(['PA,WV,VA,MD,NJ,DE'])"
                href="#"
                >Mid-Atlantic Region</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="changeByRegion(['MS,TN,KY,GA,SC,NC,FL,VI'])"
                href="#"
                >Southeast Region</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="changeByRegion(['MN,NE,KS,MO,IA,WI,IL,OH,MI'])"
                href="#"
                >Midwest Region</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="changeByRegion(['TX,NM,OK,AR,LA'])"
                href="#"
                >Southwest Region</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="changeByRegion(['MT,WY,UT,CO,ND,SD'])"
                href="#"
                >Rocky Mountain Region</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="changeByRegion(['CA,AZ,NV,HI,AS'])"
                href="#"
                >Western Region</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="changeByRegion(['WA,OR,ID,AK'])"
                href="#"
                >Pacific Northwest & Alaska</a
              >
            </li>
          </ul>
        </div>
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
    </section>

    <!-- SECTION park cards -->
    <section class="row justify-content-center px-md-5">
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
          <h2 class="text-center text-dark" title="Click here to see more">
            <span class="selectable">About Us</span>
          </h2>
        </router-link>
        <p class="p-2">
          The Park Rangers: a group dedicated to hard work, powerful insights
          and a love for the outdoors and adventure. The great outdoors and the
          incredible national parks inspired us to create an application where
          users can go to plan out their next epic journey.
          <br /><br />
          Creating trips and adding parks and activities to do was an idea that
          brought us back to our childhoods, loading up in the car with the
          family and heading out to these incredible destinations. We wanted to
          create a place where you can take in the beautiful scenery and feel
          the inspiration we felt to start a new journey.
          <br /><br />
          <router-link :to="{ name: 'About' }">
            Learn more about this incredible team and our passion for web
            development.
          </router-link>
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

  <div
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    class="modal fade"
    id="demoTrip"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Trip Creation Demo
          </h1>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal()"
          ></button>
        </div>
        <div class="modal-body">
          <iframe
            id="myVideo"
            height="650"
            src="https://www.youtube.com/embed/SLRFK9hy-1E"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { parksService } from "../services/ParksServices.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import ParkCard from "../components/ParkCard.vue";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import SmallModalVue from "../components/SmallModal.vue";
import CreateTripForm from "../components/CreateTripForm.vue";
import { Modal } from "bootstrap";

export default {
  setup() {
    const route = useRoute();
    const editable = ref("");

    const coverImages = [
      "/img/HomePagePics/picture1.jpg",
      "/img/HomePagePics/picture2.jpg",
      "/img/HomePagePics/picture3.jpg",
      "/img/HomePagePics/picture4.jpg",
      "/img/HomePagePics/picture5.jpg",
      "/img/HomePagePics/picture6.jpg",
      "/img/HomePagePics/picture7.jpg",
    ];
    async function getParks() {
      try {
        AppState.allPageChange = true;
        AppState.searchPageChange = false;
        AppState.regionPageChange = false;
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
      window.scrollTo(0, 0);

      let video = document.getElementById("myVideo");
      let modal = document.getElementById("demoTrip");
      modal.addEventListener("show.bs.modal", () => {
        video.src = "https://www.youtube.com/embed/SLRFK9hy-1E";
      });
      modal.addEventListener("hidden.bs.modal", () => {
        video.src = "";
      });
    });
    onBeforeUnmount(() => {
      AppState.parks = [];
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

      closeModal() {
        Modal.getOrCreateInstance("#demoTrip").hide();
      },

      async searchPark() {
        try {
          AppState.allPageChange = false;
          AppState.searchPageChange = true;
          AppState.regionPageChange = false;
          const query = editable.value;
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

      async changeByRegion(region) {
        try {
          AppState.allPageChange = false;
          AppState.searchPageChange = false;
          AppState.regionPageChange = true;
          await parksService.changeByRegion(region);
        } catch (error) {
          logger.error(error);
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

#myVideo {
  width: 100%;
  object-fit: cover;
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

.jc {
  justify-content: end;
}

@media screen and (max-width: 480px) {
  .search-bg {
    min-height: 50vh;
  }

  iframe {
    height: 30vh !important;
  }
}

.jc {
  justify-content: center;
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
