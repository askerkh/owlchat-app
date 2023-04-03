import { IUser } from "../../context/MessagesContext"
import { ISelectedUser } from "../GitHubFinder"

interface Props extends IUser {
  onClick: (user: ISelectedUser) => void
  id: string
}

const UserCard: React.FC<Props> = ({ avatar, username, onClick, id }) => {
  return (
    <div
      onClick={() => onClick({ avatar, username, id })}
      className="flex w-full cursor-pointer gap-4 rounded-xl bg-bgSecondary px-4 py-2 text-white transition-all hover:brightness-125"
    >
      <img
        src={avatar}
        alt="User Image"
        className="h-12 w-12 rounded-[100%] border-2 border-white"
      />
      <h2 className="select-none text-xl md:text-3xl">{username}</h2>
    </div>
  )
}

export default UserCard
