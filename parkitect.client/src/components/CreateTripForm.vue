<template>
  <form @submit.prevent="createTrip()">
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="name" placeholder="Name" name="name" required v-model="editable.name">
      <label for="name">Name</label>
    </div>
    <div class="form-floating mb-3">
      <input type="url" class="form-control" id="mgUrl" placeholder="ImgUrl" name="imgUrl" required
        v-model="editable.coverImg">
      <label for="imgUrl">ImgUrl</label>
    </div>
    <div class="form-floating mb-3">
      <input type="text" class="form-control" id="description" placeholder="Description" name="description" required
        v-model="editable.description">
      <label for="description">Description</label>
    </div>
    <div class="my-3 text-end">
      <button data-bs-dismiss="modal" class="btn btn-success" type="submit">Create!</button>
    </div>
  </form>
</template>


<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import {tripsService} from '../services/TripsService.js'

export default {
  setup() {
    const router = useRouter()
    const editable = ref({})
    return {
      editable,
      async createTrip() {
        try { 
          const tripData = editable.value
          const trip = await tripsService.createTrip(tripData)
          router.push({ name: "TripDetails", params: { tripId: trip.id} })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>