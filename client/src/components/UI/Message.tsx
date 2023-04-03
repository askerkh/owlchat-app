import { IMessage } from "../../context/MessagesContext"
import useGlobal from "../../hooks/useGlobal"

const Message: React.FC<IMessage & { isNew: boolean }> = ({
  isNew,
  user,
  message,
}) => {
  const { username } = useGlobal()
  const isThisCurrentUser = username == user.username

  return (
    <li
      className={`flex h-max w-max flex-row gap-4 rounded-xl bg-bgSecondary px-4 py-2 ${
        isNew ? "animate-popup" : null
      }  ${isThisCurrentUser ? "self-end" : "self-start"}`}
    >
      <img
        src={user.avatar}
        alt="User Image"
        className={`${
          isThisCurrentUser ? "order-2" : null
        } h-12 w-12 self-end rounded-[100%] border-2 border-white`}
      />
      <p className="h-max w-full max-w-withOutAvatar break-words text-base text-white">
        {message}
      </p>
    </li>
  )
}

export default Message
