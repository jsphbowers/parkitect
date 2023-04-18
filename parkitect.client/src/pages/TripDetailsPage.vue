<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <!-- SECTION cover photo -->
      <div class="col-12 p-0">
        <img v-if="trip" :src="trip?.coverImg" :alt="'cover image for ' + trip?.name" class="cover-img">
      </div>
      <div class="d-flex justify-content-end mt-2 mb-0" v-if="trip?.creatorId == account?.id">
        <button class="btn addBtn me-2" data-bs-toggle="modal" data-bs-target="#sendInvitation">Send Invitation</button>
        <button class="btn addBtn" data-bs-toggle="modal" data-bs-target="#editTripModal">Edit Trip Info</button>
        <button class="btn addBtn ms-2" data-bs-toggle="modal" data-bs-target="#editParkModal">Edit Travel Plans</button>
      </div>
      <!-- SECTION trip details card -->
      <div class="col-md-11 text-center trip-details-card">
        <h1>{{ trip?.name }}</h1>
        <h5>{{ trip?.description }}</h5>
      </div>
      <!-- SECTION tripGoers photos -->
      <h3 class="mb-0">Who's coming along...</h3>
      <div class="col-md-11 trip-goers-card">
        <div v-for="t in tripGoers" :key="t.id" class="position-relative">
          <img :src="t.account.picture" :alt="'a photo of ' + t.account.name" :title="t.account.name" class="profile-pic">
          <button v-if="deletePermissions(t.accountId)" class="btn btn-outline p-0 remove-tripGoer-btn"
            title="Remove Trip Goer" @click="removeTripGoer(t.id)">
            <i class="mdi mdi-minus"></i>
          </button>
        </div>
      </div>
      <!-- SECTION tripParks -->
      <h3 class="mb-0">Sights to see & things to do!</h3>
      <div class="col-md-11 parks-area draggable">
        <section class="row mb-4" v-for="t in tripParks" :key="t.id">
          <div class="col-md-7">
            <router-link :to="{ name: 'ParkDetails', params: { parkCode: t.parkCode } }">
              <h1 class="text-dark">{{ t.fullName }}</h1>
              <img :src="t.image" :alt="'a photo of ' + t.fullName" class="park-img">
            </router-link>
          </div>
          <div class="col-md-5">
            <!-- SECTION tripThingsToDo -->
            <h3 class="mt-md-5 mt-2">Activities</h3>
            <ul v-if="tripThingsToDo.filter(ttd => ttd.parkCode == t.parkCode).length">
              <span v-for="ttd in tripThingsToDo.filter(ttd => ttd.parkCode == t.parkCode)" :key="ttd.id">
                <li v-if="ttd.parkCode == t.parkCode" class="selectable" data-bs-toggle="modal"
                  data-bs-target="#activity-modal" @click="setActiveThingToDo(ttd.nativeThingToDoId)">{{ ttd.title }}</li>
              </span>
            </ul>
            <h6 v-else>No activities have been added for this park</h6>
          </div>
        </section>
      </div>
      <!-- SECTION map? -->
      <h3 class="mb-3">Let's see where we're going!</h3>

      <div class="col-11 d-flex justify-content-center">

        <iframe v-if="parks.length > 0" :src="getIframeURL()" width="600" height="450" style="border:0;"
          allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

        <!-- <iframe
          src="https://www.google.com/maps/embed?pb=!1m34!1m12!1m3!1d25360675.473180342!2d-100.68166218757999!3d39.399528282049204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m19!3e0!4m5!1s0x8096f09df58aecc5%3A0x2d249c2ced8003fe!2sBiscayne%20National%20Park%2C%20Florida!3m2!1d37.8651011!2d-119.5383294!4m5!1s0x4caebfbebe3482a1%3A0xfeb2b70c758b6ece!2sAcadia%20National%20Park%20Pond%2C%20Bar%20Harbor%2C%20ME!3m2!1d44.3781849!2d-68.2502444!4m5!1s0x80cac2a2ab47ad8b%3A0xcec87a0218d05dc5!2sZion%20National%20Park%2C%20UT%2C%20Springdale%2C%20UT!3m2!1d37.200365999999995!2d-112.98934!5e0!3m2!1sen!2sus!4v1681850729454!5m2!1sen!2sus"
          width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe> -->
        <!-- <MapContainer /> -->
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-danger mb-2" @click="toggleArchiveTrip()"><span v-if="trip?.isArchived == false">Archive
          </span><span v-else>Un-Archive</span>
          Trip</button>
      </div>
    </section>
  </div>

  <SmallModal id="sendInvitation">
    <template #header>
      <h5>Send your Invitation</h5>
    </template>
    <template #body>
      <SendInvitation />
    </template>
  </SmallModal>

  <SmallModal id="editTripModal">
    <template #header>
      <h5>Edit your Trip</h5>
    </template>
    <template #body>
      <EditTripForm />
    </template>
  </SmallModal>

  <SmallModal id="editParkModal">
    <template #header>
      <h5>Edit Travel Plans</h5>
    </template>
    <template #body>
      <ParkOptionsMenu />
    </template>
  </SmallModal>

  <ActiveCardModal id="activity-modal" />
</template>

<script>
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { tripsService } from "../services/TripsService.js";
import { tripGoersService } from "../services/TripGoersService.js";
import { tripParksService } from "../services/TripParksService.js";
import { tripThingsToDoService } from "../services/TripThingsToDoService.js";
import { computed, onMounted, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import ActiveCardModal from "../components/ActiveCardModal.vue";
import SmallModal from "../components/SmallModal.vue";
import EditTripForm from "../components/EditTripForm.vue";
import ParkOptionsMenu from "../components/ParkOptionsMenu.vue";
import SendInvitation from "../components/SendInvitation.vue";
import MapContainer from "../components/MapContainer.vue";
import { parksService } from "../services/ParksServices.js";


export default {
  setup() {
    const route = useRoute();

    async function getMyTrip() {
      try {
        const tripId = route.params.tripId;
        await tripsService.getMyTrip(tripId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }

    async function getTripGoersByTripId() {
      try {
        const tripId = route.params.tripId;
        await tripGoersService.getTripGoersByTripId(tripId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }

    async function getTripThingsToDoByTripId() {
      try {
        const tripId = route.params.tripId;
        await tripThingsToDoService.getTripThingsToDoByTripId(tripId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }

    async function getTripParksByTripId() {
      try {
        const tripId = route.params.tripId;
        await tripParksService.getTripParksByTripId(tripId);
      }
      catch (error) {
        logger.log(error);
        Pop.error(error.message);
      }
    }

    async function getParksFromTripParks() {
      try {
        await parksService.getParksFromTripParks()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }


    watchEffect(() => {
      if (AppState.account?.id) {
        getMyTrip();
        getTripGoersByTripId();
        getTripThingsToDoByTripId();
        getTripParksByTripId();
      };
    });

    watchEffect(() => {
      if (AppState.tripParks.length != 0) {
        getParksFromTripParks()
      }
    })


    return {
      trip: computed(() => AppState.activeTrip),
      tripGoers: computed(() => AppState.tripGoers),
      tripParks: computed(() => AppState.tripParks),
      tripThingsToDo: computed(() => AppState.tripThingsToDo),
      account: computed(() => AppState.account),
      parks: computed(() => AppState.parks),

      deletePermissions(tripGoerAccountId) {
        const userId = AppState.account?.id
        const tripCreatorId = AppState.activeTrip?.creatorId
        // tripCreator cannot be removed from their own trip
        if (tripGoerAccountId == tripCreatorId) {
          return false
          // tripCreator can remove any other users from the trip
        } else if (userId == tripCreatorId) {
          return true
          // users other than tripCreator may remove themselves and nobody else
        } else if (userId != tripCreatorId && userId == tripGoerAccountId) {
          return true
        }
      },


      getIframeURL() {
        try {
          // return `https://www.google.com/maps/embed?pb=!1m34!1m12!1m3!1d25360675.473180342!2d-100.68166218757999!3d39.399528282049204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m19!3e0!4m5!1s0x8096f09df58aecc5%3A0x2d249c2ced8003fe!2sBiscayne%20National%20Park%2C%20Florida!3m2!1d${AppState.parks[0].latitude}!2d${AppState.parks[0].longitude}!4m5!1s0x4caebfbebe3482a1%3A0xfeb2b70c758b6ece!2sAcadia%20National%20Park%20Pond%2C%20Bar%20Harbor%2C%20ME!3m2!1d${AppState.parks[1].latitude}!2d${AppState.parks[1].longitude}!4m5!1s0x80cac2a2ab47ad8b%3A0xcec87a0218d05dc5!2sZion%20National%20Park%2C%20UT%2C%20Springdale%2C%20UT!3m2!1d37.200365999999995!2d-112.98934!5e0!3m2!1sen!2sus!4v1681850729454!5m2!1sen!2sus`
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async setActiveThingToDo(nativeThingToDoId) {
        try {
          await tripThingsToDoService.setActiveThingToDo(nativeThingToDoId)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },

      async removeTripGoer(tripGoerId) {
        try {
          if (await Pop.confirm("Are you sure you'd like to remove this trip goer?", "This action cannot be undone", "Yes, I'm sure", "warning")) {
            const tripId = route.params.tripId
            await tripGoersService.removeTripGoer(tripGoerId, tripId)
          }
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      },

      async toggleArchiveTrip() {
        try {
          if (await Pop.confirm("Are you sure you'd like to archive this trip?", "You'll no longer be able to edit its details", "Yes, I'm sure", "warning")) {
            const tripId = route.params.tripId
            await tripsService.toggleArchiveTrip(tripId)
          }
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      }

    };
  },
  components: { ActiveCardModal, SmallModal, EditTripForm, ParkOptionsMenu, SendInvitation, MapContainer }
}
</script>


<style lang="scss" scoped>
.trip-details-card {
  min-height: 20vh;
  background-color: rgba(217, 217, 217, 0.29);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1em;
  margin-bottom: 1em;
}

.addBtn {
  background-image: linear-gradient(rgb(150, 207, 36) 0%, #006838 100%);
  border: 0;
  color: white;
  border-radius: 10px;
  padding: 1vh;
}

.trip-goers-card {
  min-height: 12vh;
  background-color: rgba(217, 217, 217, 0.29);
  display: flex;
  align-items: center;
  margin-top: 1em;
  margin-bottom: 1em;
  padding-left: .25em;
  padding-right: .25em;
}

.profile-pic {
  border-radius: 100%;
  margin-left: .25em;
  margin-right: .25em;
  margin-top: .5em;
  margin-bottom: .5em;
  height: 10vh;
  width: 10vh;
  object-fit: cover;
  object-position: center;
}

.cover-img {
  width: 100%;
  height: 45vh;
  object-fit: cover;
  object-position: center
}

.parks-area {
  margin-top: 1em;
  margin-bottom: 1.5em;
}

.park-img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 45vh
}

.position-relative {
  position: relative
}

.remove-tripGoer-btn {
  background-color: rgba(255, 87, 87, 0.525);
  height: 1.5em;
  width: 1.5em;
  border-radius: 100%;
  position: absolute;
  bottom: 72%;
  left: 70%
}

.remove-tripGoer-btn:hover {
  background-color: rgb(255, 87, 87);
}
</style>