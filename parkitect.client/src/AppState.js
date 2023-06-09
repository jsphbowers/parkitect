import { reactive } from "vue";

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  // NOTE toggle for icon display
  parksVisited: true,
  /** @type {import('./models/Park.js').Park[]} */
  parks: [],
  /** @type {import('./models/Park.js').Park[]} */
  searchedParks: [],
  /** @type {import('./models/Park.js').Park|null} */
  activePark: null,
  parksArchived: false,
  query: [],
  /** @type {import('./models/ThingToDo.js').ThingToDo[]} */
  thingsToDo: [],
  /** @type {import('./models/TripThingToDo.js').TripThingToDo[]} */
  tripThingsToDo: [],
  /** @type {import('./models/ThingToDo.js').ThingToDo|null} */
  activeThingToDo: null,
  loading: {},
  /** @type {import('./models/Trip.js').Trip[]} */
  trips: [],
  /** @type {import('./models/Trip.js').Trip|null} */
  activeTrip: null,
  /** @type {import('./models/TripGoer.js').TripGoer[]} */
  tripGoers: [],
  /** @type {import('./models/TripPark.js').TripPark[]} */
  parkPassportCount: 0,
  tripParks: [],
  dictTripParks: {},
  dictThingsToDo: {},
  currentPage: null,
  total: null,
  start: null,
  dictionary: {},
  allPageChange: false,
  searchPageChange: false,
  regionPageChange: false,
  clickedMyPassport: false,
  locations: [],
  activeParkWeather: {},
});
