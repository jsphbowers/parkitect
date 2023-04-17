<template>
  <div class="container-fluid">
    <!-- SECTION Cover Photo with title  -->
    <section class="row px-0">
      <div class="col-12 px-0">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
          <!-- <div class="carousel-inner">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
          </div> -->
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img :src="park?.images[0].url" class="carousel-img d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5 class="txt-shadow">{{ park?.name }}</h5>
              </div>
            </div>
            <div class="carousel-item">
              <img :src="park?.images[1].url" class="carousel-img d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5 class="txt-shadow">{{ park?.name }}</h5>
              </div>
            </div>
            <div class="carousel-item">
              <img :src="park?.images[2].url" class="carousel-img d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5 class="txt-shadow">{{ park?.name }}</h5>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
    <!-- SECTION Description -->
    <section class="row p-2">
      <div class="col-12 bg-primary p-3 about">
        <h6 class="txt-shadow">{{ park?.description }}</h6>
      </div>
    </section>
    <!-- SECTION Popular Activities with filter bar or buttons-->
    <section class="row">
      <div class="col-12 d-flex justify-content-between my-3 px-4">
        <h4>Popular Activities</h4>
        <div class="dropdown" v-if="account?.id">
          <button class="btn addParkBtn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Add Park To Trip
          </button>
          <ul class="dropdown-menu">
            <div v-for="trip in myTrips" :key="trip.id">
              <TripListItem :tripName="trip" />
            </div>
            <li><a class="dropdown-item selectable" data-bs-toggle="modal" data-bs-target="#tripModal">Create Trip</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-12 d-flex justify-content-evenly">
        <div class="text-center p-2">
          <img @click="changeActivityType('')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0aW9uYWwlMjBwYXJrfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="all">
          <h5 class="py-2">All</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('hiking')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhpa2luZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="">
          <h5 class="py-2">Hiking</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('snow')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/photo-1616429553002-faf23468952d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNraWluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="hiking">
          <h5 class="py-2">Snow</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('water')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/photo-1440993443326-9e9f5aea703a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmVjcmVhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="water">
          <h5 class="py-2">Water</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('fishing')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/photo-1532015917327-c7c46aa1d930?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=853&q=80"
            alt="fishing">
          <h5 class="py-2">Fishing</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('guided')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/photo-1504807959081-3dafd3871909?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8Z3VpZGV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            alt="guided">
          <h5 class="py-2">Guided</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('camping')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FtcGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="">
          <h5 class="py-2">Camping</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('other')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/photo-1594976382948-12e3439721b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8eWVsbG93c3RvbmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            alt="">
          <h5 class="py-2">Other</h5>
        </div>
      </div>
    </section>

    <!-- SECTION Filtered ToDos -->

    <section class="row">
      <div class="col-3"></div>
    </section>
    <!-- SECTION footer -->
    <section class="temp row justify-content-center">
      <div class="col-md-6 px-0" v-for="a in activities" :key="a.nativeId">
        <ActivityCard :activity="a" />
      </div>
    </section>
    <section class="row justify-content-between text-center">
      <div class="col-4">
        <h6>
          Park Contact Info: {{ park?.contacts.emailAddresses[0].emailAddress }}
        </h6>
      </div>
      <div class="col-4">
        <div class="dropdown">
          <button class="btn addParkBtn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Hours of Operation
          </button>
          <ul class="dropdown-menu text-center">
            <li>
              <p>Sunday: {{ park?.operatingHours[0].standardHours.sunday }}</p>
            </li>
            <li>
              <p>Monday: {{ park?.operatingHours[0].standardHours.monday }}</p>
            </li>
            <li>
              <p>Tuesday: {{ park?.operatingHours[0].standardHours.tuesday }}</p>
            </li>
            <li>
              <p>Wednesday: {{ park?.operatingHours[0].standardHours.wednesday }}</p>
            </li>
            <li>
              <p>Thursday: {{ park?.operatingHours[0].standardHours.thursday }}</p>
            </li>
            <li>
              <p>Friday: {{ park?.operatingHours[0].standardHours.friday }}</p>
            </li>
            <li>
              <p>Saturday: {{ park?.operatingHours[0].standardHours.saturday }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>

  <!-- SECTION THE BIG MODAL -->

  <!-- Button trigger modal -->
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button> -->

  <!-- Modal -->
  <!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div> -->
  <SmallModal id="tripModal">
    <template #header>
      <div>Create Your Trip!</div>
    </template>
    <template #body>
      <CreateTripForm />
    </template>
  </SmallModal>
</template>


<script>
import { router } from "../router.js";
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { onMounted, computed, ref, watchEffect } from "vue";
import { parksService } from "../services/ParksServices.js";
import { AppState } from "../AppState.js";
import { tripsService } from "../services/TripsService.js"
import SmallModal from "../components/SmallModal.vue";
import CreateTripForm from "../components/CreateTripForm.vue";
import TripListItem from "../components/TripListItem.vue";


export default {
  setup() {
    const route = useRoute();
    const filterType = ref("");
    const keywords = { hiking: ["hiking", "walking"], snow: ["skiing", "snow"], water: ["water", "kayaking", "boat", "paddling"], fishing: ["fishing", "fish"], guided: ["tour", "program"], camping: ["camp"], other: ["driving", "flying", "watching", "trekking", "biking"] };
    async function getThingsToDo() {
      try {
        // NOTE used parkId here 
        const parkCode = route.params.parkCode;
        await parksService.getThingsToDo(parkCode);
        console.log();
      }
      catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    }
    async function getMyCreatedTrips() {
      try {
        await tripsService.getMyCreatedTrips();
      }
      catch (error) {
        Pop.error(error.message);
        logger.error(error.message);
      }
    }
    async function getActivePark() {
      try {
        const parkCode = route.params.parkCode;
        await parksService.getParkByParkCode(parkCode);
      }
      catch (error) {
        Pop.error(error.message);
        logger.error(error.message);
      }
    }
    onMounted(() => {
      getThingsToDo();
      getActivePark();
      window.scrollTo(0, 0);
    });
    watchEffect(() => {
      if (AppState.account?.id) {
        getMyCreatedTrips();
      }
    });
    return {
      park: computed(() => AppState.activePark),
      account: computed(() => AppState.account),
      myTrips: computed(() => AppState.trips),
      activities: computed(() => {
        if (!filterType.value) {
          return AppState.thingsToDo;
        }
        else {
          // debugger
          return AppState.thingsToDo.filter(thing => {
            // NOTE This filter will got through all the thingToDo and for every one it will run this for loop(the number of times that it needs to check each array string from keywords) to check if it contains the keyword. If it does contain one of the keywords then it will return/add the "thing" to the filtered thingsToDo.
            for (let i = 0; i < keywords[filterType.value].length; i++) {
              let newArray = keywords[filterType.value];
              if (thing.activities[0].name.toLowerCase().includes(newArray[i])) {
                return thing;
              }
            }
          });
        }
      }),
      changeActivityType(type) {
        filterType.value = type;
      }
    };
  },
  components: { SmallModal, CreateTripForm, TripListItem }
}
</script>


<style lang="scss" scoped>
.filter-img {
  height: 15vh;
  width: 15vh;
  border-radius: 50%;
}

.carousel-img {
  width: 100%;
  height: 75vh;
  object-fit: cover;

}

.txt-shadow {
  text-shadow: 1px 1px black,
    1px 1px 2px #0970a3,
    -3px 1px 5px #009dff40;
}

.about {
  background-image: linear-gradient(#009dff40 0%, #065177 100%);
  border: 0;
  color: #ffff;
  padding: 0 25px;
  border-radius: 5px;
  box-shadow: none;
}

.addParkBtn {
  background-image: linear-gradient(rgb(150, 207, 36) 0%, rgb(0, 104, 56) 100%);
  border: 0;
  color: #ffff;
  padding: 0 25px;
  border-radius: 30px;
  box-shadow: none;
  border-top-left-radius: 30px !important;
  border-bottom-left-radius: 30px !important;
}
</style>