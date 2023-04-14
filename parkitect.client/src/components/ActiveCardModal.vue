<template>
  <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
  </button> -->

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">{{ activity?.title }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body container-fluid">
          <section class="row">
            <div class="col-4">
              <h5>Type: {{ activity?.activities[0].name }}</h5>
              <h6> Typically takes {{ activity?.duration }}:</h6>
              <h6>{{ activity?.durationDescription }}</h6>
              <h5>Seasons:</h5>
              <h6>
                <img v-if="activity?.season[0] == 'Winter'"
                  src="https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/winter-recreation-area-black-22.svg"
                  alt="Winter">
                <img v-if="activity?.season[1] == 'Spring'"
                  src="https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/flower-viewing-black-22.svg"
                  alt="Spring">
                <img v-if="activity?.season[3] == 'Summer'"
                  src="https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/sunny-black-22.svg"
                  alt="Summer">
                <img v-if="activity?.season[4] == 'Fall'"
                  src="https://raw.githubusercontent.com/nationalparkservice/symbol-library/gh-pages/src/standalone/wilderness-black-22.svg"
                  alt="Fall">
              </h6>
              <h5>Times of Day:</h5>
              <h6>{{ activity?.timeOfDay }}</h6>
            </div>
            <div class="col-8">
              <h4>Description:</h4>
              <h6>{{ activity?.longDescription }}
              </h6>
            </div>
          </section>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn addBtn">Add to Trip</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";

export default {
  setup() {
    return {
      activity: computed(() => AppState.activeThingToDo)
    }
  }
}
</script>


<style lang="scss" scoped>
.addBtn {
  background-image: linear-gradient(rgb(150, 207, 36) 0%, #006838 100%);
  border: 0;
  color: #ffff;
  border-radius: 10px;
  padding: 1vh;
  margin-bottom: 0%;
}
</style>