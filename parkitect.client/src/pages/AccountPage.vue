<template>
  <div class="container-fluid" v-if="account">
    <!-- SECTION Cover Images and Account Image -->
    <section class="row mb-4">
      <div class="p-0 col-12 account-img-cont">
        <div class="account-img-cont p-0">
          <img class="account-img" :src="account.picture" alt="">
        </div>
      </div>
    </section>

    <!-- SECTION My trips -->
    <div class="d-flex justify-content-between">
      <h3 class="name-style">{{ account.name }}</h3>
      <button class="btn btn-outline-success me-3">Edit Account</button>
    </div>
    <!-- <h3 class="name-style">{{ account.name }}</h3> -->
    <div class="row">
      <h1 class="trip-margin">My Trips</h1>

    </div>
    <section class="my-5 row">
      <div class=" col-xl-3 col-md-6 col-lg-4 trip-sizing d-flex justify-content-center" v-for="t in tripGoers"
        :key="t.id">



        <MyTripCard :tripGoer="t" />
      </div>
      <div class="col-xl-3 col-md-6 col-lg-4 trip-sizing d-flex justify-content-center">
        <div class="create-trip justify-content-center align-items-center d-flex selectable" data-bs-toggle="modal"
          data-bs-target="#tripModal">
          <i class="mdi mdi-plus"></i>
        </div>
      </div>
    </section>
    <section class="row">

    </section>

    <!-- SECTION Places Ive been to -->
    <section class=" mt-3 row">
      <div class="col-12 mt-5 text-center title-bg">
        <h2 class=""><b>Build your National Park passport!</b></h2>
      </div>
      <div>
        <button @click="showYourParks()" class="btn btn-outline-success">Show your parks</button>

      </div>
      <div class=" col-12 icon-bg">
        <div v-if="parksVisited" class="justify-content-evenly d-flex flex-wrap my-2 py-5">
          <img v-for="parkCode in icons" @click="visitPark(parkCode)" class="icon-style mb-3 selectable"
            :src="`/icons/${parkCode}.png`" alt="" :class="hasVisited(parkCode)">
        </div>
        <div v-if="!parksVisited" class="justify-content-evenly d-flex flex-wrap my-2 py-5">
          <img v-for="parkCode in icons" @click="visitPark(parkCode)" class="icon-style mb-3 selectable"
            :src="`/icons/${parkCode}.png`" alt="" :class="displayYourParks(parkCode)">
        </div>
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
import { computed, ref, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService.js"
import { tripGoersService } from "../services/TripGoersService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import SmallModalVue from "../components/SmallModal.vue";
import CreateTripForm from "../components/CreateTripForm.vue";
import MyTripCard from "../components/MyTripCard.vue"


export default {
  setup() {
    const coverImages = ['src/assets/img/HomePagePics/picture1.jpg', 'src/assets/img/HomePagePics/picture2.jpg', 'src/assets/img/HomePagePics/picture3.jpg', 'src/assets/img/HomePagePics/picture4.jpg', 'src/assets/img/HomePagePics/picture5.jpg', 'src/assets/img/HomePagePics/picture6.jpg', 'src/assets/img/HomePagePics/picture7.jpg']

    const icons = ref([
      "acad", "arch", "badl", "bibe", "bisc", "blca", "brca", "cany", "care", "cave", "chis", "cong", "crla", "cuva", "dena", "deva", "drto", "ever", "gaar", "glac", "glba", "grba", "grca", "grsa", "grsm", "grte", "gumo", "hale", "havo", "hosp", "indu", "isro", "jeff", "jotr", "katm", "kefj", "kica", "kova", "lacl", "lavo", "maca", "meve", "mora", "neri", "noca", "npsa", "olym", "pefo", "pinn", "redw", "romo", "sagu", "seqa", "shen", "thro", "viis", "voya", "whsa", "wica", "wrst", "yell", "yose", "zion",
    ])

    const showParks = false

    async function getTripGoerByAccountId() {
      try {
        await tripGoersService.getTripGoerByAccountId()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    // async getTripGoerByAccountId(){
    //   const res = await api.get('/account/tripGoers')
    //   AppState.tripGoers = res.data.map(t => new TripGoer(t))
    // }

    onMounted(() => {
      getTripGoerByAccountId()
    })

    return {
      coverImages,
      icons,
      account: computed(() => AppState.account),
      tripGoers: computed(() => AppState.tripGoers),
      parksVisited: computed(() => AppState.parksVisited),
      selectedImg: computed(() => {
        const randomIndex = Math.floor(Math.random() * coverImages.length)
        return `url(${coverImages[randomIndex]})`
      }),

      hasVisited(parkCode) {
        return AppState.account.parksVisited?.includes(parkCode) ? '' : 'grayscale'
      },

      displayYourParks(parkCode) {
        return AppState.account.parksVisited?.includes(parkCode) ? '' : 'noDisplay'
      },

      async visitPark(parkCode) {
        try {
          // NOTE removes from visited. Ungrayscales
          if (AppState.account.parksVisited.includes(parkCode)) {
            // AppState.account.parksVisited.pop()
            logger.log(AppState.account.parksVisited)
            const index = AppState.account.parksVisited.findIndex(p => parkCode == p)
            AppState.account.parksVisited.splice(index, 1)
          } else {
            AppState.account.parksVisited.push(parkCode)
          }
          await accountService.editAccount()
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      },
      async showYourParks() {
        try {
          await accountService.showYourParks()
        } catch (error) {
          logger.error(error)
          Pop.error(error.message)
        }
      }
    }
  },
  components: { SmallModalVue, CreateTripForm, MyTripCard },
}
</script>

<style scoped>
.account-img {
  height: 30vh;
  width: 30vh;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  bottom: -7vh;
  left: 6vw;
  border: 3px solid white;
}

.edit-account-btn {
  background-image: linear-gradient(rgb(150, 207, 36) 0%, rgb(0, 104, 56) 100%);
  border: 0;
  color: #ffff;
  padding: 0px 10px;
  border-radius: 20px;
  box-shadow: none;
  font-size: 16px;

  /* border-top-left-radius: 20px !important;
  border-bottom-left-radius: 20px !important; */
}



.title-bg {
  background-color: rgb(224, 224, 224);
  padding-top: 5vh;
  padding-bottom: 5vh;
  text-shadow: 1.5px 1.5px 4px rgb(100, 100, 100);
}

/* NOTE Remove test Trip */
.test-trip {

  background-position: center;
  background-size: cover;
}

.trip-text {
  color: white;
  text-shadow: 3px 3px 1px black;
  /* backdrop-filter: invert(100%); */
  backdrop-filter: blur(4px);
  padding: 1vh;

}

.create-trip {
  height: 30vh;
  width: 30vh;
  border: 3px solid black;
  font-size: 70px;
  font-weight: 300;
  /* box-shadow: 3px 3px 6px black; */
  border-radius: 8px;
  border: 3px solid rgb(0, 0, 0);
  /* box-shadow: 10px -10px 0 -3px rgb(230, 230, 230), 10px -10px rgb(0, 0, 0), 20px -20px 0 -3px rgb(230, 230, 230), 20px -20px rgb(0, 0, 0); */
  box-shadow: 5px -5px 0 -1.5px rgb(230, 230, 230), 5px -5px rgb(0, 0, 0), 10px -10px 0 -1.5px rgb(230, 230, 230), 10px -10px rgb(0, 0, 0);
}

.account-img-cont {
  background-image: v-bind(selectedImg);
  width: 100%;
  height: 40vh;
  background-position: center;
  background-size: cover;
}



.coverImg {
  width: 100%;
  height: 40vh;
  object-fit: cover;
  object-position: center;
}



.trip-sizing {
  justify-content: center;
  display: flex;
  margin-bottom: 5vh;
}

.grayscale {
  filter: grayscale(1);
}

.noDisplay {
  display: none;
}

@media(max-width:992px) {
  .account-img {
    height: 20vh;
    width: 20vh;
    border-radius: 50%;
  }

  .name-style {
    text-align: center;
    font-size: 2em;
    font-weight: 500;
  }

  .icon-style {
    min-height: 18vh;
    min-width: 10vh;
    margin-left: .5vw;
    margin-right: .5vw;
    height: 15vh;
    width: 8vh;
  }


  .trip-sizing {
    justify-content: center;
    display: flex;
    margin-bottom: 5vh;
  }

  .trip-margin {
    margin-top: 15vh;
    margin-bottom: 1vh;
    text-align: center;

    font-size: 2.5em;
    font-weight: 600;
    padding-top: 5vh;
    padding-bottom: 5vh;
    text-shadow: 1.5px 1.5px 4px rgb(100, 100, 100);
    background-color: rgb(224, 224, 224);
  }

  .account-img-cont {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media(min-width:992px) {
  .account-img {
    height: 25vh;
    width: 25vh;
    border-radius: 50%;
    bottom: -12vh;
    left: 8vw;
    position: absolute;
  }

  .trip-margin {
    margin-top: 9vh;
    margin-left: 3vw;
    font-size: 3em;
    font-weight: 600;
  }

  .icon-style {
    height: 25vh;
    width: 15vh;
    margin-left: 2vh;
    margin-right: 2vh;
  }

  .name-style {
    margin-left: 24vw;
    font-size: 3em;
    font-weight: 500;
  }

  .account-img-cont {
    position: relative;
  }
}
</style>
