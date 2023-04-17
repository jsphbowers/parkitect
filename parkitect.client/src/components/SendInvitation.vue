<template>
  <form @submit.prevent="sendEmail()">
    <div class="form-floating mb-3">
      <input
        type="text"
        v-model="editable"
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
        v-model="editable"
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
        v-model="editable"
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
    <div class="my-3 text-center">
      <button data-bs-dismiss="modal" class="btn btn-success" type="submit">
        Send!
      </button>
    </div>
    <!-- </textarea>
<label for="email">Message</label>
  <textarea
  name="message"
  v-model="message"
  cols="30"
  rows="5"
  placeholder="Message"
  >
    <input type="submit" value="Send" /> -->
  </form>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
