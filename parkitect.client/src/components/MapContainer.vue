<template>
  <GoogleMap api-key="AIzaSyATZoG7a3Rf97UDfWBnc9wFsuEB5PKkh7Q" style="width: 100%; height: 500px" :center="center"
    :zoom="4">
    <MarkerCluster>
      <Marker v-for="location in locations" :key="location" :options="{ position: location }" />
    </MarkerCluster>
  </GoogleMap>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { GoogleMap, Marker, MarkerCluster } from 'vue3-google-map'
import { AppState } from "../AppState.js"

export default defineComponent({
  components: { GoogleMap, Marker, MarkerCluster },
  setup() {
    const center = { lat: 39.1000, lng: -96.8167 }

    return {
      center,
      locations: computed(() => AppState.locations)

    }
  },
})
</script>