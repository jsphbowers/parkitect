<template>
  <form @submit.prevent="changeAccount()">
    <div class="form-floating">
      <input type="url" name="picture" id="picture" class="form-control mb-2" v-model="editable.picture">
      <label for="picture">Account Image</label>
    </div>
    <div class="form-floating">
      <input class="form-control" id="name" name="name" minlength="1" maxlength="30" required v-model="editable.name">
      <label for="name">Account Name</label>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      <button type="submit" class="btn addBtn" data-bs-dismiss="modal">Save changes</button>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect, computed } from "vue";
import { AppState } from "../AppState.js";
import { accountService } from "../services/AccountService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";

export default {

  setup() {
    const editable = ref({});

    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account }
      }
    })
    return {
      editable,
      account: computed(() => AppState.account),

      async changeAccount() {
        try {
          logger.log(editable.value)
          const accountData = editable.value
          await accountService.changeAccount(accountData)
        } catch (error) {
          logger.log(error)
          Pop.error(error.message)
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped></style>