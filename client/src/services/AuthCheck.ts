import axios from "axios"

export async function authFetch(
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
  setToken: React.Dispatch<React.SetStateAction<string>>,
  setUsername: React.Dispatch<React.SetStateAction<string>>,
) {
  const token = new URL(window.location.href).searchParams.get("token")

  if (token && token.trim()) {
    return await axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .then((user) => {
        if (user.id) {
          setUsername(user.login)
          setIsAuth(true)
          setToken(token)
        }
        return token
      })
      .catch((err) => console.log(err.message))
  }
}
