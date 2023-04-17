


export class Park {
  constructor(data) {
    this.nativeId = data.id
    this.parkCode = data.parkCode
    this.name = data.fullName
    this.description = data.description
    this.latitude = data.latitude
    this.longitude = data.longitude
    this.states = this.computeStateNames(data.states)
    this.contacts = data.contacts
    this.entranceFees = data.entranceFees
    this.operatingHours = data.operatingHours
    this.addresses = data.addresses
    this.images = data.images
    this.weatherInfo = data.weatherInfo
  }

  computeStateNames(state) {
    if (state.includes("ME")) {
      return "Maine";
    } else if (state.includes("CO")) {
      return "Colorado";
    } else if (state.includes("CA")) {
      return "California";
    } else if (state.includes("NV")) {
      return "Nevada";
    } else if (state.includes("AK")) {
      return "Alaska";
    } else if (state.includes("WA")) {
      return "Washington";
    } else if (state.includes("OR")) {
      return "Oregon";
    } else if (state.includes("ID")) {
      return "Idaho";
    } else if (state.includes("AZ")) {
      return "Arizona";
    } else if (state.includes("UT")) {
      return "Utah";
    } else if (state.includes("MT")) {
      return "Montana";
    } else if (state.includes("WY")) {
      return "Wyoming";
    } else if (state.includes("NM")) {
      return "New Mexico";
    } else if (state.includes("TX")) {
      return "Texas";
    } else if (state.includes("ND")) {
      return "North Dakota";
    } else if (state.includes("SD")) {
      return "South Dakota";
    } else if (state.includes("MN")) {
      return "Minnesota";
    } else if (state.includes("MO")) {
      return "Missouri";
    } else if (state.includes("AR")) {
      return "Arkansas";
    } else if (state.includes("TN")) {
      return "Tennessee";
    } else if (state.includes("IN")) {
      return "Indiana";
    } else if (state.includes("MI")) {
      return "Michigan";
    } else if (state.includes("OH")) {
      return "Ohio";
    } else if (state.includes("KY")) {
      return "Kentucky";
    } else if (state.includes("SC")) {
      return "South Carolina";
    } else if (state.includes("WV")) {
      return "West Virginia";
    } else if (state.includes("VA")) {
      return "Virginia";
    } else if (state.includes("NC")) {
      return "North Carolina";
    } else if (state.includes("FL")) {
      return "Florida";
    } else if (state.includes("HI")) {
      return "Hawaii";
    } else if (state.includes("VI")) {
      return "Virgin Islands";
    } else if (state.includes("AS")) {
      return "American Samoa";
    }
  }
}



