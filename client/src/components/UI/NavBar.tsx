import useGlobal from "../../hooks/useGlobal"
import CreateChatButton from "../CreateChatButton"
import ChatButton from "./ChatButton"

interface Props {
  isOpened: boolean
}

const NavBar: React.FC<Props> = ({ isOpened }) => {
  const { listOfChats } = useGlobal()

  return (
    <nav
      className={`relative left-0 top-0 h-withOutHeader w-20 animate-showNavBar bg-bgSecondary shadow-none transition-all ${
        !isOpened && "hidden"
      }`}
    >
      <ul className="flex h-full w-full flex-col items-center gap-4 pt-2">
        {listOfChats &&
          listOfChats.map((chatId, index) => {
            return (
              <li key={chatId}>
                <ChatButton chatId={chatId}>{index}</ChatButton>
              </li>
            )
          })}
        <CreateChatButton />
      </ul>
    </nav>
  )
}

export default NavBar
