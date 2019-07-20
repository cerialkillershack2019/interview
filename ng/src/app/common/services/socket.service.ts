import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'

import * as socketIo from 'socket.io-client'

const DEFAULT_SERVER_URL = 'http://localhost:3000'

@Injectable()
export class SocketService {

  private socket

  constructor() {
    this.openSocket()
  }

  openSocket(url?: string): void {
    this.socket = socketIo(url || DEFAULT_SERVER_URL)
  }

  sendEventData<T = {}>(eventId: string = 'message', eventData: T): void {
    this.socket.emit(eventId, eventData)
  }

  receiveEventData<T = {}>(eventId: string = 'message'): Observable<T> {
    return new Observable<T>(o => {
      this.socket.on(eventId, (data: T) => o.next(data))
    })
  }

}
