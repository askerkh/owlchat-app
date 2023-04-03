import axios from "axios"

const isAuth = async (token: string) => {
  const user = await axios
    .get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

  if (user.id) {
    return true
  } else {
    return false
  }
}

export default isAuth
