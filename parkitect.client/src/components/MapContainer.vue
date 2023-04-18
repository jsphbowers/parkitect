<template>
  <div ref="map-root" style="width: 100%; height: 500px" class="map">
  </div>
</template>


<script>
import View from 'ol/View.js'
import Map from 'ol/Map.js'
import TileLayer from 'ol/layer/Tile.js'
import OSM from 'ol/source/OSM.js'
// import 'ol/style/'

export default {

  name: 'MapContainer',
  components: {},
  props: {},
  mounted() {
    new Map({
      controls: [],
      target: this.$refs['map-root'],
      layers: [
        new TileLayer({
          source: new OSM()
        }),
      ],
      view: new View({
        zoom: 0,
        center: [0, 0],
        constrainResolution: true
      }),
    })
  },
}

</script>


<style lang="scss" scoped>
.map {
  margin-bottom: 2em
}
</style>