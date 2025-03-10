import { User } from "./createRoom"

export type Room = {
    id: string
    pub: boolean
    name: string
    users: User[]
    messages: Message[]
}

export type SendMessageArgs = {
    roomId: string
    message: Message
}

export type Message = {
    author: string
    content: string    
}