<template>
  <div class="container-fluid">
    <!-- SECTION search bar -->
    <section class="row">
      <div class="col p-0">
        <img class="coverImg" :src="selectedImg" alt="nature">
      </div>
    </section>

    <!-- SECTION park cards -->
    <section class="row">
      <div class="col-4"></div>
      <div class="col-4"></div>
      <div class="col-4"></div>
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

export default {
  
  setup() {
    const coverImages = ['src/assets/img/HomePagePics/picture1.jpg', 'src/assets/img/HomePagePics/picture2.jpg', 'src/assets/img/HomePagePics/picture3.jpg', 'src/assets/img/HomePagePics/picture4.jpg', 'src/assets/img/HomePagePics/picture5.jpg', 'src/assets/img/HomePagePics/picture6.jpg', 'src/assets/img/HomePagePics/picture7.jpg']



    async function getParks() {
      try {
        // logger.log('getting all parks')
        await parksService.getParks();
      } catch (error) {
        Pop.error(error);
        logger.log(error)
      }
    }

    async function getParkByParkCode(parkCode) {
      try {
        await parksService.getParkByParkCode(parkCode);
      } catch (error) {
        Pop.error(error);
        logger.log(error)
      }
    }

    // TODO finish fn for search
    // async function searchParks() {
    //   const query
    // }

    onMounted(() => {
      getParks()
      getParkByParkCode('yell')
    })
    return {
      coverImages,
      selectedImg: computed(() => {
        const randomIndex = Math.floor(Math.random()*coverImages.length)
        return coverImages[randomIndex]
      })
    };
  },
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


  .coverImg {
    width: 100%;
    height: 40vh;
    object-fit: cover;
    object-position: center;
  }
</style>
