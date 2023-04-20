<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
   <footer class="bg-info text-light">
    Made with 🥾 by Park Rangers
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">

@import "./assets/scss/main.scss";

:root{
  --main-height: calc(100vh - 32px - 64px);
}
main {
  background-color: #F1F1F1;
  padding-top: 4em;
}


footer {
  display: grid;
  place-content: center;
  height: 4em;
  background-image: linear-gradient(to right, #142800 , #487043);
}
</style>
142800