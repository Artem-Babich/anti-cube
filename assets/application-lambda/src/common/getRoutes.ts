import App from './components/App'
import Gallery from './components/Gallery'

const routes = [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/',
        component: Gallery
      }
    ],
  },
]

const getRoutes = () => routes

export default getRoutes
