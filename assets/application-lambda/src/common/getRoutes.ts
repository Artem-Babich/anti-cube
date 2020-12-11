import NotFound from './pages/NotFound'

const routes = [
  {
    path: '/',
    component: NotFound,
    routes: [
      {
        component: NotFound,
      },
    ],
  },
]

const getRoutes = () => routes

export default getRoutes
