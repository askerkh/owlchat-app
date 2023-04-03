import axios from "axios"

const getGithubId = async (token: string) => {
  const user = await axios
    .get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.log(err.message))

  if (user?.id) {
    return user.id
  } else {
    return -1
  }
}

export default getGithubId
