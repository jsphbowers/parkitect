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
                class="carousel-img d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                <h5>Park Name</h5>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1502856755506-d8626589ef19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bmF0aW9uYWwlMjBwYXJrc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                class="carousel-img d-block w-100" alt="...">
              <div class=" carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1526008625783-ddfc11a3a962?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdGlvbmFsJTIwcGFya3N8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
                class="carousel-img d-block w-100" alt="...">
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
      <h4>Popular Activities</h4>
      <div class="col-12 d-flex justify-content-evenly">
        <div class="text-center p-2">
          <img @click="changeActivityType('')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmF0aW9uYWwlMjBwYXJrfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt="all">
          <h5 class="py-2">All</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('hiking')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhpa2luZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="">
          <h5 class="py-2">Hiking</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('snow')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/photo-1616429553002-faf23468952d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNraWluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="hiking">
          <h5 class="py-2">Snow</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('water')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhpa2luZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="water">
          <h5 class="py-2">Water</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('fishing')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/photo-1440993443326-9e9f5aea703a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmVjcmVhdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="water">
          <h5 class="py-2">Fishing</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('guided')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhpa2luZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="">
          <h5 class="py-2">Guided</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('camping')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhpa2luZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="">
          <h5 class="py-2">Camping</h5>
        </div>
        <div class="text-center p-2">
          <img @click="changeActivityType('other')" class="filter-img selectable elevation-3"
            src="https://images.unsplash.com/uploads/141148589884100082977/a816dbd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhpa2luZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="">
          <h5 class="py-2">Other</h5>
        </div>
      </div>
    </section>

    <!-- SECTION Filtered ToDos -->

    <section class="row">
      <div class="col-3"></div>
    </section>
    <!-- SECTION footer -->
    <section class="temp  justify-content-center" v-for="a in activities">
      <h4>{{ a.title }}</h4>
      <p>{{ a.shortDescription }}</p>
    </section>
    <section class="row justify-content-between text-center">
      <div class="col-4">Link to national Park</div>
      <div class="col-4">Operating Hours and Seasons</div>
    </section>
  </div>
</template>


<script>
import { router } from "../router.js";
import { useRoute, useRouter } from "vue-router";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { onMounted, computed, ref, watchEffect } from "vue";
import { parksService } from "../services/ParksServices.js";
import { AppState } from "../AppState.js";


export default {



  setup() {
    const route = useRoute()

    const filterType = ref('')

    const keywords = { hiking: ['hiking', 'walking'], snow: ['skiing', 'snow'], water: ['water', 'kayaking', 'boat', 'paddling'], fishing: ['fishing', 'fish'], guided: ['tour', 'program'], camping: ['camp'], other: ['driving', 'flying', 'watching', 'trekking', 'biking'] }

    async function getThingsToDo() {
      try {
        // NOTE used parkId here 
        const parkCode = route.params.parkCode
        await parksService.getThingsToDo(parkCode)
        console.log()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    onMounted(() => {
      getThingsToDo()
    })

    return {
      activities: computed(() => {
        if (!filterType.value) {
          return AppState.thingsToDo
        } else {
          // debugger
          return AppState.thingsToDo.filter(thing => {
            // NOTE This filter will got through all the thingToDo and for every one it will run this for loop(the number of times that it needs to check each array string from keywords) to check if it contains the keyword. If it does contain one of the keywords then it will return/add the "thing" to the filtered thingsToDo.
            for (let i = 0; i < keywords[filterType.value].length; i++) {
              let newArray = keywords[filterType.value]
              if (thing.activities[0].name.toLowerCase().includes(newArray[i])) {
                return thing
              }
            }
          })
        }
      }),

      changeActivityType(type) {
        filterType.value = type
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.filter-img {
  height: 15vh;
  width: 15vh;
  border-radius: 50%;
}

.carousel-img {
  width: 100%;
  height: 75vh;
  object-fit: cover;

}
</style>