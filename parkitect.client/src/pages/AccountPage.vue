<template>
  <div class="container-fluid" v-if="account">
    <!-- SECTION Cover Images and Account Image -->
    <section class="row mb-5">
      <div class="p-0 col-12 account-img-cont">
        <div class="account-img-cont p-0">
          <img class="account-img" :src="account.picture" alt="">
        </div>
      </div>
    </section>

    <!-- SECTION My trips -->
    <h2 class="ms-2 trip-margin">My Trips</h2>
    <section class="my-5 row">
      <div class="col-md-3 trip-sizing d-flex justify-content-center">
        <div class="create-trip  justify-content-center align-items-center d-flex">
          <i class="mdi mdi-plus"></i>
        </div>
      </div>
      <div class="col-md-3 trip-sizing d-flex justify-content-center">
        <div class="create-trip justify-content-center align-items-center d-flex">
          <i class="mdi mdi-plus"></i>
        </div>
      </div>
      <div class="col-md-3 trip-sizing d-flex justify-content-center">
        <div class="create-trip justify-content-center align-items-center d-flex">
          <i class="mdi mdi-plus"></i>
        </div>
      </div>
      <div class="col-md-3 trip-sizing d-flex justify-content-center">
        <div class="create-trip justify-content-center align-items-center d-flex">
          <i class="mdi mdi-plus"></i>
        </div>
      </div>
    </section>

    <!-- SECTION Places Ive been to -->
    <section class=" mt-3 row">
      <div class="col-12 mb-5 text-center">
        <h2 class="ms-2"><b>Build your National Park passport!</b></h2>
      </div>
      <div class="col-12">
        <div class="justify-content-evenly d-flex flex-wrap my-2">
          <img v-for="parkCode in icons" @click="visitPark(parkCode)" class="icon-style mb-3 selectable"
            :src="`/icons/${parkCode}.png`" alt="" :class="hasVisited(parkCode)">
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { AppState } from '../AppState'
import { accountService } from "../services/AccountService.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"

export default {
  setup() {
    const coverImages = ['src/assets/img/HomePagePics/picture1.jpg', 'src/assets/img/HomePagePics/picture2.jpg', 'src/assets/img/HomePagePics/picture3.jpg', 'src/assets/img/HomePagePics/picture4.jpg', 'src/assets/img/HomePagePics/picture5.jpg', 'src/assets/img/HomePagePics/picture6.jpg', 'src/assets/img/HomePagePics/picture7.jpg']

    const icons = ref([
      "acad", "arch", "badl", "bibe", "bisc", "blca", "brca", "cany", "care", "cave", "chis", "cong", "crla", "cuva", "dena", "deva", "drto", "ever", "gaar", "glac", "glba", "grba", "grca", "grsa", "grsm", "grte", "gumo", "hale", "havo", "hosp", "indu", "isro", "jeff", "jotr", "katm", "kefj", "kica", "kova", "lacl", "lavo", "maca", "meve", "mora", "neri", "noca", "npsa", "olym", "pefo", "pinn", "redw", "romo", "sagu", "seqa", "shen", "thro", "viis", "voya", "whsa", "wica", "wrst", "yell", "yose", "zion",
    ])



    return {
      coverImages,
      icons,
      account: computed(() => AppState.account),
      selectedImg: computed(() => {
        const randomIndex = Math.floor(Math.random() * coverImages.length)
        return `url(${coverImages[randomIndex]})`
      }),
      hasVisited(parkCode) {
        return AppState.account.parksVisited?.includes(parkCode) ? '' : 'grayscale'
      },
      async visitPark(parkCode) {
        try {
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
      }


    }
  }
}
</script>

<style scoped>
.account-img {
  height: 25vh;
  width: 25vh;
  border-radius: 50%;
  bottom: -7vh;
  left: 46vw;
  border: 2px solid white;
}

.create-trip {
  height: 30vh;
  width: 30vh;
  border: 3px solid black;
  font-size: 70px;
  font-weight: 300;
  box-shadow: 3px 3px 6px black;
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

.trip-margin {
  margin-top: 10vh;
}

.grayscale {
  filter: grayscale(1);
}

@media(max-width:992px) {
  .account-img {
    height: 15vh;
    width: 15vh;
    border-radius: 50%;
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


  .account-img-cont {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

@media(min-width:992px) {
  .account-img {
    height: 20vh;
    width: 20vh;
    border-radius: 50%;
    bottom: -10vh;
    left: 45vw;
    position: absolute;
  }

  .icon-style {
    height: 25vh;
    width: 15vh;
    margin-left: 2vh;
    margin-right: 2vh;
  }



  .account-img-cont {
    position: relative;
  }
}
</style>
