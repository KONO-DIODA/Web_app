class MyEventBus {
  constructor() {
    this.eventMap = {}
  }

  on(eventName, eventFn) {
    let eventFns = this.eventMap[eventName]
    if(!eventFns) {
      eventFns = []
      this.eventMap[eventName] = eventFns
    }
    eventFns.push(eventFn)
  }

  off(eventName, eventFn) {
    let eventFns = this.eventMap[eventName]
    if(!eventFns) return
    for(let i = 0; i < eventFns.length; i++) {
      if(eventFns[i] === eventFn) {
        eventFns.splice(i, 1)
        break
      }
    }
    if(eventFns.length === 0) delete this.eventMap[eventName]
  }

  emit(eventName, ...args) {
    let eventFns = this.eventMap[eventName]
    if (!eventFns) return
    eventFns.forEach(fn => {
      fn(...args)
    })
  }
}

const eventBus = new MyEventBus()

export default eventBus