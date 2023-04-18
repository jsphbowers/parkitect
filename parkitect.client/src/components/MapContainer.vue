<template>
  <div ref="map-root" style="width: 100%; height: 500px" class="map">
  </div>
</template>


<script>

import View from 'ol/View.js'
import Map from 'ol/Map.js'
import TileLayer from 'ol/layer/Tile.js'
import OSM from 'ol/source/OSM.js'
import Feature from "ol/Feature.js"
import VectorTileLayer from "ol/layer/VectorTile.js"
import VectorSource from "ol/source/Vector.js"
import { MultiPoint, Point } from "ol/geom.js"
import GeoJSON from 'ol/format/GeoJSON.js'
// import 'ol/style/'

const place = [-110, 45];

const point = new Point(place);
export default {
  name: 'MapContainer',
  components: {},
  props: {},
  mounted() {
    new Map({
      controls: [],
      interactions: [],
      target: this.$refs['map-root'],
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        // new VectorTileLayer({
        //   source: new VectorSource({
        //     format: new GeoJSON(),
        //     url: `../assets/data/map.geojson`,
        //     features: [new Feature(new Point(43.6150, 116.2023))]
        //   })
        // })
      ],
      view: new View({
        center: [43.6135, -116.20345],
        zoom: 0,
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