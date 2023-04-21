<template>
  <form ref="form" @submit.prevent="sendEmail()">
    <div class="form-floating mb-3">
      <input
        type="text"
        :value="inputFieldReset"
        name="name"
        class="form-control"
        id="name"
        required
        placeholder="Your Name"
        minlength="3"
        maxlength="25"
      />
      <label for="name">From Name</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="email"
        :value="inputFieldReset"
        name="email"
        class="form-control"
        placeholder="Your Email"
        id="email"
        required
        minlength="5"
      />
      <label for="email">To Email</label>
    </div>
    <div class="form-floating mb-3">
      <textarea
        :value="inputFieldReset"
        name="message"
        class="form-control"
        style="height: 100px"
        placeholder="Your Message"
        id="message"
        required
        minlength="5"
        maxlength="1000"
      ></textarea>

      <label for="message">Your Message</label>
    </div>
        <div v-if="trip" class="form-floating mb-3 ">
      <input
      readonly
        type="text"
        :value="trip?.joinCode"
        name="code"
        class="form-control"
        id="code"
        required
        placeholder="Your code"
        maxlength="1000"

      />
      <!-- <label for="code">Join Trip Code</label> -->
    </div>
    <div class="my-3 text-end">
      <button data-bs-dismiss="modal" class="btn btn-success" type="submit">
        Send!
      </button>
    </div>
  </form>
</template>

<script>
import { computed, ref } from "vue";
import emailjs from "emailjs-com";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";

export default {
  setup() {
    const form = ref(null);
    const inputFieldReset = ref(null);

    const sendEmail = () => {
      emailjs
        .sendForm(
          "service_8r6r2ud",
          "template_9pibufu",
          form.value,
          "c33CMPv6fB8wD_DtO"
        )
        .then(
          function (response) {
            logger.log("SUCCESS!", response.status, response.text);
            Pop.toast("Message sent!", "success", "center");
            inputFieldReset.value = " ";
          },
          function (error) {
            logger.log("FAILED...", error);
            Pop.toast("Message not sent", "error", "center");
          }
        );
    };

    return {
      form,
      inputFieldReset,
      sendEmail,
      trip: computed(() => AppState.activeTrip),
    };
  },
};

</script>

<style lang="scss" scoped>
#code {
  display: none;
}
</style>
