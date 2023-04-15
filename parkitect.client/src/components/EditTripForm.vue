<template>
  <form @submit.prevent="editTrip()">
    <div class="form-floating">
      <input type="text" id="name" name="name" class="form-control mb-2" minlength="3" maxlength="25"
        v-model="editable.name">
      <label for="name">Name</label>
    </div>
    <div class="form-floating">
      <input type="url" name="image url" id="coverImgUrl" class="form-control mb-2" v-model="editable.coverImg"
        @input="previewImage()">
      <label for="coverImgUrl">Cover Image URL</label>
    </div>
    <img :src="imagePreview" v-if="imagePreview" class="my-2" style="max-width: 100%" />
    <div class="form-floating">
      <textarea class="form-control" id="description" name="description" style="height: 100px" minlength="5"
        maxlength="1000" v-model="editable.description"></textarea>
      <label for="description">Description</label>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn addBtn" data-bs-dismiss="modal">Save changes</button>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import { tripsService } from "../services/TripsService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({});
    const route = useRoute();
    const imagePreview = ref(null);


    watchEffect(() => {
      if (AppState.activeTrip) {
        editable.value = { ...AppState.activeTrip }
        imagePreview.value = AppState.activeTrip.coverImg
      }
    });
    return {
      editable,
      imagePreview,
      async editTrip() {
        try {
          const tripData = editable.value
          const tripId = route.params.tripId
          await tripsService.editTrip(tripData, tripId)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },
      previewImage() {
        logger.log('changing image preview')
        imagePreview.value = editable.value.coverImg;
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.addBtn {
  background-image: linear-gradient(rgb(150, 207, 36) 0%, #006838 100%);
  border: 0;
  color: white;
  border-radius: 10px;
  padding: 1vh;
}
</style>