import Button from "./Button"
import useGlobal from "../../hooks/useGlobal"
import Events from "../../types/ws_events"

interface Props {
  children: React.ReactNode
  chatId: string
}

const ChatButton: React.FC<Props> = ({ children, chatId }) => {
  const { socket, token } = useGlobal()

  const onJoin = () => {
    if (socket && token) {
      socket.emit(Events.SERVER.JOIN_ROOM, token, chatId)
    }
  }

  const onDel = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    if (socket && token) {
      socket.emit(Events.SERVER.DELETE_ROOM, token, chatId)
    }
  }

  return (
    <Button onClick={onJoin} className="relative cursor-default">
      <span
        onClick={onDel}
        className="absolute right-0 top-0 flex h-4 w-4 cursor-pointer items-center justify-center rounded-[100%] bg-red-500 text-sm text-white content-['x']"
      >
        x
      </span>
      {children}
    </Button>
  )
}

export default ChatButton
