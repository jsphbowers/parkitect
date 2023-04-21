<template>
  <form @submit.prevent="createTrip()">
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="name" placeholder="Name" name="name" required v-model="editable.name"
        minlength="3" maxlength="25" />
      <label for="name">Name</label>
    </div>

    <div class="form-floating mb-3">
      <!-- FIXME add required back to date inputs and set minimum date to current date -->
      <input type="date" class="form-control" id="start" placeholder="Start Date" name="start" required
        v-model="editable.start" min="2023-04-20" />
      <label for="start">Start Date</label>
    </div>
    <div class="form-floating mb-3">
      <input type="date" class="form-control" id="end" placeholder="End Date" name="end" required
        v-model="editable.end" />
      <label for="end">End Date</label>
    </div>

    <div class="form-floating mb-3">
      <input type="url" class="form-control" id="mgUrl" placeholder="ImgUrl" name="imgUrl" v-model="editable.coverImg"
        @input="previewImage" />
      <label for="imgUrl">Trip Cover Photo</label>
      <br />
      <img :src="imagePreview" v-if="imagePreview" style="max-width: 100%" />
    </div>
    <div class="form-floating mb-3">
      <textarea class="form-control" id="description" placeholder="Description" name="description" required
        style="height: 100px" v-model="editable.description" minlength="5" maxlength="1000"></textarea>
      <label for="description">Description</label>
    </div>
    <div class="my-3 text-end">
      <button data-bs-dismiss="modal" class="btn btn-success" type="submit">
        Create!
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { tripsService } from "../services/TripsService.js";

export default {
  setup() {
    const router = useRouter();
    const editable = ref({});
    const imagePreview = ref(null);
    const date = new Date();
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let fullDat

    return {
      editable,
      imagePreview,
      async createTrip() {
        try {
          const tripData = editable.value;
          logger.log('[TRIP DATA CALENDAR TEST]', editable.value)
          const trip = await tripsService.createTrip(tripData);
          // router.push({ name: "TripDetails", params: { tripId: trip.id } });
          Pop.toast('Successfully created a trip', 'success', 'top')
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
      previewImage() {
        imagePreview.value = editable.value.coverImg;
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
