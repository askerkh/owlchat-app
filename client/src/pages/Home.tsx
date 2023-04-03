import Chat from "../components/Chat"
import Modal from "../components/UI/Modal"
import GitHubFinder from "../components/GitHubFinder"
import useGlobal from "../hooks/useGlobal"

const Home: React.FC = () => {
  const { currentChatId, isModalOpened } = useGlobal()

  return (
    <>
      <Modal>
        <GitHubFinder />
      </Modal>
      {!isModalOpened ? (
        <div className="flex h-withOutHeader w-full flex-col justify-end">
          {currentChatId ? (
            <Chat />
          ) : (
            <div className="flex h-withOutHeader w-full items-center justify-center ">
              <h1 className="text-xl text-iconColor">
                Create/Join chat and Enjoy!
              </h1>
            </div>
          )}
        </div>
      ) : null}
    </>
  )
}

export default Home
