<template>
  <div class="container-fluid">
    <section class="row justify-content-center">
      <!-- SECTION cover photo -->
      <div class="col-12 p-0">
        <img v-if="trip" :src="trip?.coverImg" :alt="'cover image for ' + trip?.name" class="cover-img"
          :class="{ 'archivedCover-img': archived }">
      </div>
      <div class="d-flex justify-content-end mt-2 mb-0" v-if="trip?.creatorId == account?.id">
        <button v-if="!archived" class="btn addBtn me-2" data-bs-toggle="modal" data-bs-target="#sendInvitation">Send
          Invitation</button>
        <button v-if="archived" class="btn addBtn me-2" disabled>Send Invitation</button>
        <button v-if="!archived" class="btn addBtn" data-bs-toggle="modal" data-bs-target="#editTripModal">Edit Trip
          Info</button>
        <button v-if="archived" class="btn addBtn" disabled>Edit Trip Info</button>
        <button v-if="!archived" class="btn addBtn ms-2" data-bs-toggle="modal" data-bs-target="#editParkModal">Edit
          Travel Plans</button>
        <button v-if="archived" class="btn addBtn ms-2" disabled>Edit Travel Plans</button>
      </div>
      <!-- SECTION trip details card -->
      <div class="col-md-11 text-center trip-details-card">
        <h1>{{ trip?.name }}</h1>
        <h5>{{ trip?.description }}</h5>
        <h5>Join Code: <span class="text-info">{{ trip?.joinCode }}</span></h5>
        <h6 v-if="archived" class="archiveBanner px-0 mx-0">
          This trip has been archived!
        </h6>
      </div>
      <!-- SECTION tripGoers photos -->
      <h3 class="mb-0">Who's coming along...</h3>
      <div class="col-md-11 trip-goers-card">
        <div v-for="t in tripGoers" :key="t.id" class="position-relative">
          <img :src="t.account.picture" :alt="'a photo of ' + t.account.name" :title="t.account.name"
            :class="archived ? 'archivedProfile-pic' : 'profile-pic'">
          <button v-if="deletePermissions(t.accountId) && !archived" class="btn btn-outline p-0 remove-tripGoer-btn"
            title="Remove Trip Goer" @click="removeTripGoer(t.id)">
            <i class="mdi mdi-minus"></i>
          </button>
          <button v-if="deletePermissions(t.accountId) && archived" class="btn btn-outline p-0 remove-tripGoer-btn"
            title="Remove Trip Goer" disabled>
            <i class="mdi mdi-minus"></i>
          </button>
        </div>
      </div>
      <!-- SECTION tripParks -->
      <h3 class="mb-0">Sights to see & things to do!</h3>
      <div class="col-md-11 parks-area draggable">
        <section class="row mb-4" :class="{ 'archivedImg': archived }" v-for="t in tripParks" :key="t.id">
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

      <!-- SECTION map -->
      <h3 class="mb-3" v-if="parks.length > 0">Let's see where we're going!</h3>
      <div class="col-11 d-flex justify-content-center">
        <img :src="mapURL" alt="a map showing trip locations" v-if="parks.length > 0"
          :class="{ 'archivedImg': archived }">
      </div>
      <div class="d-flex justify-content-end">
        <button v-if="trip?.creatorId == account?.id" class="btn archiveBtn mb-2" @click="toggleArchiveTrip()"><span
            v-if="trip?.isArchived == false">Archive
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
import { computed, onBeforeUnmount, onMounted, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import ActiveCardModal from "../components/ActiveCardModal.vue";
import SmallModal from "../components/SmallModal.vue";
import EditTripForm from "../components/EditTripForm.vue";
import ParkOptionsMenu from "../components/ParkOptionsMenu.vue";
import SendInvitation from "../components/SendInvitation.vue";
import MapContainer from "../components/MapContainer.vue";
import { parksService } from "../services/ParksServices.js";
import { mapsService } from "../services/MapsService.js";
import { googleApiKey } from "../../.variables"

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

    onMounted(() => {
      window.scrollTo(0, 0);
    })

    onBeforeUnmount(() => {
      AppState.parks = []
    })


    return {
      trip: computed(() => AppState.activeTrip),
      tripGoers: computed(() => AppState.tripGoers),
      tripParks: computed(() => AppState.tripParks),
      tripThingsToDo: computed(() => AppState.tripThingsToDo),
      account: computed(() => AppState.account),
      parks: computed(() => AppState.parks),
      archived: computed(() => AppState.activeTrip?.isArchived),


      // FIXME Need to call to GoogleAPI from the server side so that our API key is protected. Otherwise, it will be accessible to users via the network tab. Should probably also request a new API key.

      // I started working on the fix for the above, but even if the call comes from our server side, the image tag in the HTML is still going to be populated with the image URL, which includes the API key. Even if our request going out to Google doesn't show up in the network tab.

      mapURL: computed(() => {
        let URL = `http://maps.googleapis.com/maps/api/staticmap?key=${googleApiKey}&size=800x400&center=USA&zoom=3&maptype=terrain`
        let markers = ``
        AppState.parks.forEach(p => {
          markers += `&markers=color:green|size:mid|label:${p.name[0]}|${p.latitude},${p.longitude}`
        })
        URL += markers
        return URL
      }),

      // async getMap() {
      //   await mapsService.getMap()
      // },

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
          if (AppState.activeTrip.isArchived == false) {
            if (await Pop.confirm("Are you sure you'd like to archive this trip?", "You'll no longer be able to edit its details", "Yes, I'm sure", "warning")) {
              const tripId = route.params.tripId
              await tripsService.toggleArchiveTrip(tripId)
            }
          } else if (AppState.activeTrip.isArchived == true) {
            if (await Pop.confirm("Are you sure you'd like to re-activate this trip?", "It will once again be open for editing", "Yes, I'm sure", "warning")) {
              const tripId = route.params.tripId
              await tripsService.toggleArchiveTrip(tripId)
            }
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

.archiveBtn {
  background-image: linear-gradient(rgb(224, 116, 97) 0%, #cf0606 100%);
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

// NOTE This section is for the archived page styling
// #region


.archivedCover-img {
  width: 100%;
  height: 45vh;
  object-fit: cover;
  object-position: center;
  filter: grayscale(100%);
}

.archiveBanner {
  background-color: #ff4646;
  height: 4vh;
  font-size: larger;
  font-weight: bold;
  padding-top: 1vh;
}

.archivedProfile-pic {
  border-radius: 100%;
  margin-left: .25em;
  margin-right: .25em;
  margin-top: .5em;
  margin-bottom: .5em;
  height: 10vh;
  width: 10vh;
  filter: grayscale(100%);
  object-fit: cover;
  object-position: center;
}

.archivedImg {
  filter: grayscale(100%);
}

// #endregion
</style>