<template>
  <form id="invitation-form" ref="form" @submit.prevent="sendEmail()">
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
      <label for="name">Name</label>
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
      <label for="email">Email</label>
    </div>
    <div class="form-floating mb-3">
      <textarea
        :value="inputFieldReset"
        name="message"
        class="form-control"
        style="height: 100px"
        placeholder="Your Message with Link"
        id="message"
        required
        minlength="5"
        maxlength="1000"
      ></textarea>

      <label for="message">Message</label>
    </div>
    <div class="my-3 text-end">
      <!-- <input type="submit" value="Send"> -->
      <button data-bs-dismiss="modal" class="btn btn-success" type="submit">
        Send!
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import emailjs from "emailjs-com";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  setup() {
    const form = ref(null);
    const inputFieldReset = ref(null);

    const sendEmail = () => {
      //  const formData = new FormData(form.value);
      emailjs
        .sendForm(
          "service_me2qvqm",
          "template_4w9u10q",
          '#invitation-form',
          "conHZtLsbEMo7rKCJ"
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
    };
  },
};
// name: 'ContactUs',
// data() {
//   return {
//     name: '',
//     email: '',
//     message: ''
//   }
// },
// methods: {
//   sendEmail(e) {
//     try {
//       emailjs.sendForm('service_me2qvqm', 'template_4w9u10q', e.target, 'conHZtLsbEMo7rKCJ', {
//         name: this.name,
//         email: this.email,
//         message: this.meessage
//       })
//     } catch (err) {
//          if (err instanceof ReferenceError) {
//           alert( "JSON Error: " + err.message );
//          } else {
//           throw err; // rethrow
//          }
//     }
//     // Reset form field
//     this.name = ''
//     this.email = ''
//     this.message = ''
//   },
// }
</script>

<style lang="scss" scoped></style>
