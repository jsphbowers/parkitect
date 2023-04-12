<template>
  <div class="container-fluid">
    <!-- SECTION Cover Photo with title  -->
    <section class="row px-0">
      <div class="col-12">
        <div id="carouselExampleCaptions" class="carousel slide">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1606859309981-270838d57ed8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0aW9uYWwlMjBwYXJrc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Park Name</h5>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1502856755506-d8626589ef19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bmF0aW9uYWwlMjBwYXJrc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1526008625783-ddfc11a3a962?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdGlvbmFsJTIwcGFya3N8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
                class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </section>
    <!-- SECTION Description -->
    <section class="row p-2">
      <div class="col-12 bg-primary p-3">
        <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, odit nostrum voluptate ducimus doloribus
          laborum. Quam libero voluptate repellat quaerat, impedit cum, animi soluta eius, fuga iste reprehenderit
          officiis nulla. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione eos aut quis nostrum quas cum
          earum voluptates distinctio totam error, beatae repudiandae minus incidunt quae quod modi in officia ex?</h6>
      </div>
    </section>
    <!-- SECTION Popular Activities with filter bar or buttons-->
    <section class="row">
      <div class="col-12">
        <h4>Popular Activities</h4>
      </div>

    </section>
    <!-- SECTION footer -->
  </div>
</template>


<script>
import { router } from "../router.js";
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { onMounted, computed, ref, watchEffect } from "vue";
import { parksService } from "../services/ParksServices.js";


export default {
  setup() {
    const route = useRoute()

    async function getThingsToDo() {
      try {
        // NOTE used parkId here 
        const parkCode = route.params.parkCode
        await parksService.getThingsToDo(parkCode)
        console.log('Test')
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getThingsToDo()
    })
    return {
    }
  }
}
</script>


<style lang="scss" scoped></style>