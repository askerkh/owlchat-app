import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
  useRef,
  useEffect,
} from "react"
import io, { Socket } from "socket.io-client"
import Events from "../types/ws_events"
import { authFetch } from "../services/AuthCheck"
import MessagesProvider from "./MessagesContext"

interface IContext {
  currentChatId: string
  setCurrentChatId: Dispatch<SetStateAction<string>>
  listOfChats: string[]
  setListOfChats: Dispatch<SetStateAction<string[]>>
  socket: Socket | undefined
  isAuth: boolean
  setIsAuth: Dispatch<React.SetStateAction<boolean>>
  token: string
  setToken: Dispatch<React.SetStateAction<string>>
  username: string
  isModalOpened: boolean
  setIsModalOpened: Dispatch<React.SetStateAction<boolean>>
}

export const GlobalContext = createContext<IContext>({} as IContext)

const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentChatId, setCurrentChatId] = useState("")
  const [listOfChats, setListOfChats] = useState<string[]>([])
  const [isAuth, setIsAuth] = useState(false)
  const [token, setToken] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [isModalOpened, setIsModalOpened] = useState(false)
  const socket = useRef<Socket>()

  const contextValue: IContext = {
    currentChatId,
    setCurrentChatId,
    listOfChats,
    setListOfChats,
    socket: socket.current,
    isAuth,
    setIsAuth,
    token,
    setToken,
    username,
    isModalOpened,
    setIsModalOpened,
  }

  useEffect(() => {
    authFetch(setIsAuth, setToken, setUsername).then((token) => {
      if (!token) return
      socket.current = io("https://owlchat-api.onrender.com")

      socket.current.emit(Events.CONNECT)

      socket.current.emit(Events.SERVER.AUTH, token)

      socket.current.on(Events.CLIENT.GET_ALL_ROOMS, (rooms: string[]) => {
        setListOfChats(rooms)
      })

      socket.current.on(Events.CLIENT.SET_ROOM_ID, (id: string) => {
        setCurrentChatId(id)
      })
    })
  }, [])

  return (
    <GlobalContext.Provider value={contextValue}>
      <MessagesProvider socket={socket.current as Socket}>
        {children}
      </MessagesProvider>
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
