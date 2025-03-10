import { Room } from "./room"

export type CreateRoomArgs = {
  pub: boolean
  userName: string
}

export type User = {
  name: string
}

export type CreateRoomResponse = {
  success: boolean
  message: string
  room: Room
}

// For error responses
export type ErrorResponse = {
  success: false
  message: string
  error?: string
}
