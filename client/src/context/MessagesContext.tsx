import { createContext, PropsWithChildren, useState, useEffect } from "react"
import { Socket } from "socket.io-client"
import Events from "../types/ws_events"

export interface IUser {
  username: string
  avatar: string
}

export interface IMessage {
  message: string
  user: IUser
  chatId: string
}

interface IContext {
  messages: IMessage[]
}

export const MessagesContext = createContext<IContext>({} as IContext)

const MessagesProvider: React.FC<PropsWithChildren & { socket: Socket }> = ({
  children,
  socket,
}) => {
  const [messages, setMessages] = useState<IMessage[]>([])

  const contextValue = {
    messages,
  }

  useEffect(() => {
    if (socket) {
      socket.on(
        Events.CLIENT.MESSAGE,
        (message: string, user: IUser, chatId: string) => {
          setMessages((prev) => [...prev, { message, user, chatId }])
        },
      )
    }
  }, [socket])

  return (
    <MessagesContext.Provider value={contextValue}>
      {children}
    </MessagesContext.Provider>
  )
}

export default MessagesProvider
