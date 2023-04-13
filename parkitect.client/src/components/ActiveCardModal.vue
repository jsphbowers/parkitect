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
            </div>
            <div class="col-8" :inner-h-t-m-l="activity?.longDescription">

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