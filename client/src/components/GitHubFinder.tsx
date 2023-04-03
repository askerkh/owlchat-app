import { useState } from "react"
import { IUser } from "../context/MessagesContext"
import useGlobal from "../hooks/useGlobal"
import { FetchUser } from "../services/FetchUser"
import Button from "./UI/Button"
import UserCard from "./UI/UserCard"
import Events from "../types/ws_events"

export interface ISelectedUser extends IUser {
  id: string
}

const GitHubFinder: React.FC = () => {
  const { token, socket, setIsModalOpened } = useGlobal()
  const [user, setUser] = useState<(IUser & { id: string }) | null>(null)
  const [addedUsers, setAddedUsers] = useState<ISelectedUser[]>([])
  const [username, setUsername] = useState<string>("")
  const [isUsersEmpty, setIsUsersEmpty] = useState(false)

  const removeUser = (selUser: ISelectedUser) => {
    setAddedUsers((prev) => prev.filter((user) => user.id !== selUser.id))
    if (addedUsers.length == 0) {
      setIsUsersEmpty(true)
    }
  }

  const addChat = () => {
    if (!(socket && token)) return

    if (addedUsers.length) {
      socket.emit(Events.SERVER.CREATE_ROOM, token, addedUsers)
    }

    setUsername("")
    setUser(null)
    setAddedUsers([])
    setIsUsersEmpty(true)
    setIsModalOpened(false)
  }

  const addUser = (selUser: ISelectedUser) => {
    if (!addedUsers.find((user) => user.id == selUser.id)) {
      setAddedUsers((prev) => [...prev, selUser])
      setIsUsersEmpty(false)
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (username.trim()) {
      FetchUser(token, username)
        .then((fetchedUser) => {
          if (fetchedUser != -1) {
            setUser(fetchedUser)
          }
        })
        .catch(() => {
          setUser(null)
        })
    }
    setUsername("")
  }

  return (
    <div className="z-10 flex h-max w-max flex-col items-center justify-center gap-4 rounded-xl bg-bgSecondary px-8 py-12">
      <form className="flex flex-row gap-4" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Input username here..."
          className="w-full appearance-none break-words rounded-xl bg-bgSecondaryButton px-4 py-2 text-base text-white outline-none placeholder:text-textColor md:text-xl"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          type="submit"
          className="w-max rounded-xl px-4 py-2 hover:rounded-none"
        >
          Search
        </Button>
      </form>

      <h1 className="text-xl text-white">Founded</h1>
      <span className="h-[1px] w-full bg-bgSecondaryButton" />

      {user != null ? (
        <UserCard onClick={addUser} {...user} />
      ) : (
        <h1 className="bg-red-500 px-4 py-2 text-xl">Not found</h1>
      )}

      <span className="mt-8 h-[1px] w-full bg-bgSecondaryButton" />
      <h1 className="text-xl text-white">Added</h1>

      {addedUsers.map((user, index) => {
        return (
          <UserCard
            key={`${user.id}${index}${Date.now()}`}
            onClick={removeUser}
            {...user}
          />
        )
      })}
      <span className="h-[1px] w-full bg-bgSecondaryButton" />
      {isUsersEmpty ? (
        <h1 className="text-xl text-red-500">
          Can't create without added users
        </h1>
      ) : null}
      <Button
        onClick={addChat}
        className="w-max rounded-xl px-4 py-2 hover:rounded-none"
      >
        Create chat
      </Button>
    </div>
  )
}

export default GitHubFinder
