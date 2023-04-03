import Button from "./Button"
import useGlobal from "../../hooks/useGlobal"
import SendIcon from "../../../public/sendIcon.svg"
import Events from "../../types/ws_events"
import { useState } from "react"

const AddMessageForm: React.FC = () => {
  const { currentChatId, socket, token } = useGlobal()
  const [text, setText] = useState("")

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (socket && token && currentChatId && text.trim()) {
      socket.emit(Events.SERVER.SEND_MESSAGE, text, token, currentChatId)
    }
    setText("")
  }

  return (
    <form
      autoComplete="off"
      className="flex w-full animate-popup flex-row gap-4"
      onSubmit={sendMessage}
    >
      <input
        type="text"
        name="message input"
        className="w-full appearance-none break-words rounded-xl bg-bgSecondaryButton px-4 py-2 text-base text-white outline-none placeholder:text-textColor md:text-xl"
        placeholder="Message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button className="bg-icon bg-bgSecondaryButton" type="submit">
        <img src={SendIcon} alt="Send Button Icon" className="w-6" />
      </Button>
    </form>
  )
}

export default AddMessageForm
