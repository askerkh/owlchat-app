import { PropsWithChildren, useState } from "react"
import useGlobal from "../../hooks/useGlobal"
import Logo from "../../../public/Logo.svg"
import BurgerIcon from "../../../public/BurgerIcon.svg"
import Button from "./Button"
import NavBar from "./NavBar"

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [isNavOpened, setIsNavOpened] = useState(false)
  const { isAuth, setCurrentChatId } = useGlobal()

  return (
    <>
      <div className="flex h-16 w-full flex-row justify-center">
        <header className="flex h-full w-full items-center justify-between bg-bgSecondary pr-4">
          {isAuth && (
            <>
              <div className="flex h-full w-20 items-center justify-center">
                <Button onClick={() => setIsNavOpened(!isNavOpened)}>
                  {isNavOpened ? (
                    "x"
                  ) : (
                    <img src={BurgerIcon} alt="Burger Icon" />
                  )}
                </Button>
              </div>
              <img
                className="cursor-pointer"
                src={Logo}
                alt="Logo Icon"
                onClick={() => setCurrentChatId("")}
              />
            </>
          )}
        </header>
      </div>
      <main className="relative mx-auto flex w-full flex-grow flex-row gap-4">
        {isAuth && <NavBar isOpened={isNavOpened} />}
        <div
          className={`flex flex-col ${isNavOpened ? "w-withOutBar" : "w-full"}`}
        >
          {children}
        </div>
      </main>
    </>
  )
}

export default Layout
