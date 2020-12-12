import App from './components/App'
import Gallery from './components/Gallery'
import Login from './components/Login'

const routes = [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/',
        component: Gallery,
        exact: true
      },
      {
        path: '/login',
        component: Login,
        exact: true
      },
    ],
  },
]

const getRoutes = () => routes

export default getRoutes
