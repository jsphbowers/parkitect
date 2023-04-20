export class Trip {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.creatorId
    this.name = data.name
    this.description = data.description
    this.coverImg = data.coverImg || 'https://images.unsplash.com/photo-1628110341049-37a92fcbcb14?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80'
    this.joinCode = data.joinCode
    this.isArchived = data.isArchived
    this.start = data.start
    this.end = data.end
    this.allDay = data.allDay
    this.event = data.event
  }
}