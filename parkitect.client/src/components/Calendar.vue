<template>
  <FullCalendar :options='calendarOptions' />
</template>


<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { computed } from "@vue/reactivity"
import { AppState } from "../AppState.js"
// import { INITIAL_EVENTS, createEventId } from './event-utils'

export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    // let eventGuid = 0
    // let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
    // const INITIAL_EVENTS = [
    //   {
    //     id: createEventId(),
    //     title: 'All-day event',
    //     start: todayStr
    //   },
    //   {
    //     id: createEventId(),
    //     title: 'Timed event',
    //     start: todayStr + 'T12:00:00'
    //   }
    // ]
    // function createEventId() {
    //   return String(eventGuid++)
    // }

    return {
      trips: computed(() => AppState.tripGoers),
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
        // initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: true,
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