export class TripThingToDo {
  constructor(data) {
    this.activities = data.activities
    this.id = data.id
    this.nativeThingToDoId = data.nativeThingToDoId
    this.title = data.title
    this.tripId = data.tripId
    this.parkCode = data.parkCode
  }
}