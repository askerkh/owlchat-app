import { useEffect, useRef } from "react"
import useGlobal from "../hooks/useGlobal"
import useMessages from "../hooks/useMessages"
import AddMessageForm from "./UI/AddMessageForm"
import Message from "./UI/Message"

const Chat: React.FC = () => {
  const { currentChatId } = useGlobal()
  const { messages } = useMessages()
  const mockElement = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if(mockElement.current) {
      mockElement.current.scrollIntoView({behavior: "smooth"})
    }
  }, [messages])

  return (
    <div className="scrollbar-hide flex w-full h-withOutHeader flex-col justify-end gap-4 overflow-y-scroll px-2">
      <ul className="scrollbar-hide flex h-max w-full flex-col gap-4 overflow-y-scroll">
        {messages
          ? messages.map((message, index) => {
              const isNew = messages[messages.length - 1] == message

              if (message.chatId == currentChatId) {
                return (
                  <Message
                    isNew={isNew}
                    key={`${message.chatId}${message.user.username}${
                      message.message
                    }${index}${Date.now() + Math.random()}`}
                    {...message}
                  />
                )
              }
            })
          : null}
        <div ref={mockElement} />
      </ul>
      <AddMessageForm />
    </div>
  )
}

export default Chat
