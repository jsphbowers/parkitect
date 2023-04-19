<template>
  <FullCalendar />
</template>


<script>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin

export default {

  setup() {
    components: {
      FullCalendar // make the <FullCalendar> tag available
    }
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth'
      }
    }
  }
}
</script>


<style lang="scss" scoped></style>