import { Routes, Route } from "react-router-dom"
import Layout from "./components/UI/Layout"
import useGlobal from "./hooks/useGlobal"
import { AuthPageRoutes, UnAuthPageRoutes } from "./routes"

const App: React.FC = () => {
  const { isAuth } = useGlobal()

  return (
    <Layout>
      <>
        <Routes>
          {(isAuth ? AuthPageRoutes : UnAuthPageRoutes).map((page, index) => {
            return (
              <Route
                key={`${index}-${page}`}
                path={page.path}
                element={<page.element />}
              />
            )
          })}
        </Routes>
      </>
    </Layout>
  )
}

export default App
