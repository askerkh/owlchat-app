import axios from "axios"

interface GithubUser {
  id: string
  avatar_url: string
  login: string
}

export const FetchUser = async (token: string, username: string) => {
  return await axios
    .get<GithubUser>(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .then((user) => {
      if (user?.id) {
        return { avatar: user.avatar_url, username: user.login, id: user.id }
      } else {
        return -1
      }
    })
}
