export class ThingToDo {
  constructor(data) {
    this.nativeId = data.id
    this.title = data.title
    this.shortDescription = data.shortDescription
    this.images = data.images
    this.tags = data.tags
    this.seasonDescription = data.seasonDescription
    this.accessibilityInformation = data.accessibilityInformation
    this.isReservationRequired = data.isReservationRequired
    this.arePetsPermitted = data.arePetsPermitted
    this.activities = data.activities
    this.activityDescription = data.activityDescription
    this.locationDescription = data.locationDescription
    this.doFeesApply = data.doFeesApply
    this.longDescription = data.longDescription
    this.season = data.season
    this.durationDescription = data.durationDescription
    this.duration = data.duration
    this.timeOfDay = data.timeOfDay
    this.parkCode = data.relatedParks[0].parkCode
  }
}