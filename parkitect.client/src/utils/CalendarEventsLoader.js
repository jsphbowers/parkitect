import { AppState } from "../AppState.js"

export const INITIAL_EVENTS = AppState.trips.map(t => {
  let trip = {
    id: t.id,
    title: t.name,
    start: t.start,
    end: t.end,
    allDay: t.allDay,
    display: t.display
  }
  return trip
})