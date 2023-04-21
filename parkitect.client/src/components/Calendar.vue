<template>
  <FullCalendar :options='calendarOptions' />
</template>


<script>
import { defineComponent, watchEffect } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"

export default defineComponent({
  components: {
    FullCalendar,
  },
  props: {
    trips: { type: Object, required: true }
  },
  data() {


    watchEffect(() => {
      this.trips
    })

    return {

      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        initialView: 'dayGridMonth',
        height: 700,
        timezone: 'local',
        themeSystem: 'standard',
        eventBackgroundColor: 'rgb(91, 122, 88)',
        events: computed(() => this.trips.map(t => {
          // if (t.includes(t.id)) {

          let trip = {
            id: t.id,
            title: t.name,
            start: t.start.slice(0, 10),
            end: t.end.slice(0, 10),
            allDay: t.allDay,
            description: t.description,
            display: t.display
            // display: 'block'
          }

          let x = new Date(trip.end)
          x.setDate(x.getDate() + 2)
          trip.end = x

          return trip
          // }
        })),
        // alternatively, use the `events` setting to fetch from a feed
        // editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        // select: this.handleDateSelect,
        // eventClick: this.handleEventClick,
        // eventsSet: this.handleEvents
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    };
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },
    handleDateSelect(selectInfo) {
      let title = prompt('Please enter a new title for your event');
      let calendarApi = selectInfo.view.calendar;

      calendarApi.unselect(); // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },
    handleEventClick(clickInfo) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
  },
})
</script>


<style lang="scss" scoped></style>