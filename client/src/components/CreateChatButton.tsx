import useGlobal from "../hooks/useGlobal"
import Button from "./UI/Button"

const CreateChatButton: React.FC = () => {
  const { setIsModalOpened } = useGlobal()

  return (
    <Button
      onClick={() => {
        setIsModalOpened(true)
      }}
    >
      +
    </Button>
  )
}

export default CreateChatButton
