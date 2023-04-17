<template>
  <div class="sidebar-nav">
    <nav class="navbar navbar-primary bg-primary align-content-center">
      <div class="container-fluid">
        <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
          <div class="d-flex">
            <img alt="logo" src="../assets/img/Logo.png" height="55" />
          </div>
        </router-link>
        <!-- <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
   </button> -->
        <!-- <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto"> -->
        <!-- <li>
          <router-link :to="{ name: 'About' }" class="btn text-success lighten-30 selectable text-uppercase">
            About
          </router-link>
        </li> -->
        <!-- </ul> -->
        <!-- LOGIN COMPONENT HERE -->
        <!-- <Login /> -->
        <!-- </div> -->
        <!-- <span class="navbar-text"> -->
        <button
          class="btn selectable text-dark text-uppercase my-2 my-lg-0"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>
        <div v-else>
          <button
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
                  class="rounded mb-3"
                />
              </div>
              <ul class="navbar-nav">
                <router-link :to="{ name: 'Account' }" >
              <li class="text-decoration-none text-dark selectable py-2">
                My Trips
              </li>
            </router-link>
            <hr>
            <li class="text-decoration-none text-dark selectable py-2" data-bs-toggle="modal"
          data-bs-target="#tripModal">
                Create a Trip
              </li>
              <hr>
              <li class="text-danger selectable py-2" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </li>
              </ul>

            </div>
          </div>

          <!-- <div class="dropdown dropstart my-2 my-lg-0">
        <div type="button" class=" border-0 selectable no-select" data-bs-toggle="dropdown"
          aria-expanded="false">
          <div v-if="account.picture || user.picture">
            <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
          </div>
        </div>
        <div class="dropdown-menu dropdown-menu-lg-left p-0" aria-labelledby="authDropdown">
          <div class="list-group">
            <router-link :to="{ name: 'Account' }">
              <div class="list-group-item dropdown-item list-group-item-action">
                Manage Account
              </div>
            </router-link>
            <div class="list-group-item dropdown-item list-group-item-action text-danger selectable" @click="logout">
              <i class="mdi mdi-logout"></i>
              logout
            </div>
          </div>
        </div>
      </div> -->
        </div>
        <!-- </span> -->
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
import { computed, watchEffect } from "vue";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
import SmallModalVue from "../components/SmallModal.vue";
import CreateTripForm from "../components/CreateTripForm.vue";
export default {
  setup() {
    // watchEffect(() => {
    //   const offcanvasElement = document.getElementById("offcanvasNavbar");
    //   const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    //   if (offcanvas && offcanvas._backdrop) {
    //     offcanvas.hide();
    //   }
    // });
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    //    closeOffcanvas,
    // offcanvasNavbar,
    };
  },
  components: { SmallModalVue, CreateTripForm },
};
// import Login from './Login.vue'
// export default {
//   setup() {
//     return {}
//   },
//   components: { Login }
// }
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}
.offcanvas-body li {
  font-size: 18px
}

/* .navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
} */

.sidebar-nav .offcanvas {
    width: 270px;
}

@media screen and (max-width: 768px) {
  .offcanvas-body img {
    height: 5em;
    width: 5em;
  }
}
</style>
