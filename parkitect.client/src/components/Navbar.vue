<template>
  <div class="sidebar-nav">
    <nav
      class="navbar navbar-primary bg-primary align-content-center shadow fixed-top p-0"
    >
      <div class="container-fluid">
        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
          <div class="d-flex">
            <img alt="logo" src="../assets/img/Logo.png" height="55" />
          </div>
        </router-link>
        <button
          class="btn selectable text-dark text-uppercase my-2 my-lg-0"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>
        <div v-else>
          <button
          title="Option menu"
            class="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="bg-light offcanvas offcanvas-end shadow"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            ref="offcanvasNavbar"
          >
            <div class="offcanvas-header justify-content-end">
              <button
              title="Close"
                type="button"
                class="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body text-center">
              <div v-if="account.picture || user.picture">
                <img
                  :src="account.picture || user.picture"
                  alt="account photo"
                  height="100"
                  class="rounded mb-3 avatar"
                />
              </div>
              <ul class="navbar-nav">
                <div @click="closeOffcanvas()">
                  <router-link :to="{ name: 'Account' }">
                    <li class="text-decoration-none text-dark selectable py-2">
                      My Trips
                    </li>
                  </router-link>
                </div>
                <hr />
                <div @click="closeOffcanvas()">
                  <button
                    class="btn create-btn selectable py-2"
                    data-bs-toggle="modal"
                    data-bs-target="#tripModal"
                  >
                    Create a Trip
                  </button>
                </div>
                <hr />
                <div>
                  <button
                    class="btn btn-underline selectable w-75"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                  >
                    Join Code
                  </button>
                  <div class="collapse" id="collapseExample">
                    <form @submit.prevent="joinTrip()">
                      <div class="d-flex">
                        <input
                        v-model="editable"
                        type="text"
                        name="code"
                        class="form-control inline-input"
                        id="code"
                        placeholder="Input join code here"
                        />
                        <div @click="closeOffcanvas()">
                        <button title="Join trip"
                          class="btn btn-success inline-btn"
                          type="submit"
                        >
                          <i class="mdi mdi-plus"></i>
                        </button>
                      </div>
                      </div>
                    </form>
                  </div>
                </div>
                <hr />
                <li class="text-danger selectable py-2" @click="logout">
                  <i class="mdi mdi-logout"></i>
                  logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>

  <SmallModalVue id="tripModal">
    <template #header>
      <div>Create Your Trip!</div>
    </template>
    <template #body>
      <CreateTripForm />
    </template>
  </SmallModalVue>
</template>

<script>
import { computed, ref } from "vue";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
import SmallModalVue from "../components/SmallModal.vue";
import CreateTripForm from "../components/CreateTripForm.vue";
import { Offcanvas } from "bootstrap";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { tripGoersService } from "../services/TripGoersService";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter()
    const editable = ref('')

    return {
      editable,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },

      closeOffcanvas() {
        const offcanvasElement = document.getElementById("offcanvasNavbar");
        const offcanvas = Offcanvas.getOrCreateInstance(offcanvasElement);
        if (offcanvas) {
          offcanvas.hide();
        }
      },

      async joinTrip() {
        try {
          const joinCode = editable.value
          await tripGoersService.joinTrip(joinCode)
          Pop.toast('Successfully joined the trip!', 'success', 'top')
          const tripId = AppState.activeTrip.id
          router.push({ name: 'TripDetails', params: { tripId: tripId } })
          editable.value = ' '
          // logger.log(tripGoer)
        } catch (error) {
          logger.error(error);
          Pop.toast("Invalid join code", 'warning', 'top');
        }
      },
    }
  },
  components: { SmallModalVue, CreateTripForm },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}
.offcanvas-body li {
  font-size: 18px;
}

.sidebar-nav .offcanvas {
  width: 270px;
}

.create-btn {
  background-image: linear-gradient(rgb(150, 207, 36) 0%, #006838 100%);
  border: 0;
  color: white;
  border-radius: 10px;
  padding: 1vh;
}

.btn-underline {
  text-decoration: underline;
  border: none;
}

.inline-input {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px
}
.inline-btn {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px
}

.avatar {
  object-fit: cover;
  object-position: center;
}

@media screen and (max-width: 768px) {
  .offcanvas-body img {
    height: 5em;
    width: 5em;
  }
}
</style>
