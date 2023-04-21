<template>
  <GoogleMap api-key="AIzaSyATZoG7a3Rf97UDfWBnc9wFsuEB5PKkh7Q" style="width: 100%; height: 500px" :center="center"
    :zoom="4">
    <MarkerCluster>
      <Marker v-if="locations" v-for="(location, i) in locations" :key="i" :options="{ position: location }">

        <InfoWindow>
          <div id="content">
            <div id="siteNotice"></div>
            <h6 id="firstHeading" class="firstHeading">{{ parks[i].name }}</h6>
            <!-- <div id="bodyContent">
              <p>{{ parks[i].description }}</p>
            </div> -->
          </div>
        </InfoWindow>

      </Marker>
    </MarkerCluster>
  </GoogleMap>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { GoogleMap, Marker, MarkerCluster, InfoWindow } from 'vue3-google-map'
import { AppState } from "../AppState.js"

export default defineComponent({
  components: { GoogleMap, Marker, MarkerCluster, InfoWindow },
  setup() {
    const center = { lat: 39.1000, lng: -96.8167 }

    return {
      center,
      locations: computed(() => AppState.locations),
      parks: computed(() => AppState.parks)

    }
  },
})
</script>