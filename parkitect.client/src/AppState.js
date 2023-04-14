import { reactive } from "vue";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Park.js').Park[]} */
  parks: [],
  /** @type {import('./models/Park.js').Park|null} */
  activePark: null,
  query: [],
  /** @type {import('./models/ThingToDo.js').ThingToDo[]} */
  thingsToDo: [],
  /** @type {import('./models/ThingToDo.js').ThingToDo|null} */
  activeThingToDo: null,
  trips: [],
  loading: {},
  /** @type {import('./models/Trip.js').Trip[]} */
  trips: [],
  /** @type {import('./models/Trip.js').Trip|null} */
  activeTrip: null
});
