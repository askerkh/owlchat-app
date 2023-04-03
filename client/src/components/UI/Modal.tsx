import useGlobal from "../../hooks/useGlobal"

const Modal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isModalOpened, setIsModalOpened } = useGlobal()

  return (
    <div
      className={`mx-auto flex h-withOutHeader w-withOutBar items-center justify-center ${
        !isModalOpened ? "hidden" : ""
      }`}
      onClick={(e) => e.currentTarget == e.target && setIsModalOpened(false)}
    >
      {children}
    </div>
  )
}

export default Modal
