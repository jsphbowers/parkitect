<template>
  <div class="container-fluid" v-if="account">
    <!-- SECTION Cover Images and Account Image -->
    <section class="row">
      <div class="p-0 col-12 account-img-cont">
        <div class="account-img-cont p-0">
          <img class="account-img" :src="account.picture" alt="">
        </div>
      </div>
    </section>

    <!-- SECTION My trips -->
    <section class="mt-3 row">
      <div class="col-12">
        <h2 class="ms-2">My Trips</h2>
      </div>
    </section>

    <!-- SECTION Places Ive been to -->
    <section class=" mt-3 row">
      <div class="col-12 mb-3">
        <h2 class="ms-2">Places Ive Been to</h2>
      </div>
      <div class="col-12">
        <div>
          <img v-for="parkCode in icons" @click="visitPark(parkCode)" class="icon-style selectable"
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
      "2",
      "1134"
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
            // Add splice
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

.icon-style {
  height: 25vh;
  width: 15vh;
}

.noGrayscale {
  filter: grayscale(0) !important;
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
    height: 15vh;
    width: 8vh;
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



  .account-img-cont {
    position: relative;
  }
}
</style>
