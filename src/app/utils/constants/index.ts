import { ROUTES } from "../enum/routesEnum"

export const routes = {
    engine:'Engine',
    fuels: 'Feuls',
    filters: 'Filters'
}
export const breadCrumbsData ={
    [ROUTES.engine] : [
        {
          title: 'Engine Management',
          path: '/engine-management/engine',
          isSeparator: false,
          isActive: false,
        },
        {
          title: '',
          path: '',
          isSeparator: true,
          isActive: false,
        },
      ],
      [ROUTES.fuels] : [
        {
          title: 'Fuels Management',
          path: '/fuel-management/fuels',
          isSeparator: false,
          isActive: false,
        },
        {
          title: '',
          path: '',
          isSeparator: true,
          isActive: false,
        },
      ],
}