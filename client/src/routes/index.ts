import Home from "../pages/Home"
import Unauthtorized from "../pages/Unauthtorized"
import NotFound from "../pages/NotFound"

interface Page {
  path: string
  element: React.FC
}

export const AuthPageRoutes: Page[] = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "*",
    element: NotFound,
  },
]

export const UnAuthPageRoutes: Page[] = [
  {
    path: "/",
    element: Unauthtorized,
  },
  {
    path: "*",
    element: NotFound,
  },
]
