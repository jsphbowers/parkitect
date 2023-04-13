<template>
  <div class="container-fluid">
    <!-- SECTION Cover Images and Account Image -->
    <section>
      <div class="col p-0">
        <img class="coverImg" :src="selectedImg" alt="nature">
      </div>
      <img class="account-img" :src="account.picture" alt="">
    </section>





  </div>





  <!-- <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div> -->
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    const coverImages = ['src/assets/img/HomePagePics/picture1.jpg', 'src/assets/img/HomePagePics/picture2.jpg', 'src/assets/img/HomePagePics/picture3.jpg', 'src/assets/img/HomePagePics/picture4.jpg', 'src/assets/img/HomePagePics/picture5.jpg', 'src/assets/img/HomePagePics/picture6.jpg', 'src/assets/img/HomePagePics/picture7.jpg']

    return {
      coverImages,
      account: computed(() => AppState.account),
      selectedImg: computed(() => {
        const randomIndex = Math.floor(Math.random() * coverImages.length)
        return coverImages[randomIndex]
      })
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.account-img {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
}

.coverImg {
  width: 100%;
  height: 40vh;
  object-fit: cover;
  object-position: center;
}
</style>
