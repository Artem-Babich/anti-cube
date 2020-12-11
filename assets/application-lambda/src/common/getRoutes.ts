import App from './components/App'
import NotFound from './pages/NotFound'

const routes = [
  {
    path: '/',
    component: App,
    routes: [
      {
        component: NotFound,
      },
    ],
  },
]

const getRoutes = () => routes

export default getRoutes
