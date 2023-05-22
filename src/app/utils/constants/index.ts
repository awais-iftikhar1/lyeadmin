import { ROUTES } from "../enum/routesEnum"

export const routes = {
    engine:'Engine',
    fuels: 'Feuls',
    filters: 'Filters',
    vehiclemachine:'Vehicle Machine',
    make:"Make",
    model:"Model",
    vehicle:"Vehicle"
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
      [ROUTES.vehiclemachine] : [
        {
          title: 'Vehicle Machine Management',
          path: '/vehicle-machine-management/vehiclemachine',
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
      [ROUTES.make] : [
        {
          title: 'Vehicle Machine Management',
          path: '/vehicle-machine-management/vehiclemachine',
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
      [ROUTES.model] : [
        {
          title: 'Vehicle Machine Management',
          path: '/vehicle-machine-management/vehiclemachine',
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
      [ROUTES.vehicle] : [
        {
          title: 'Vehicle Management',
          path: '/vehicle-management/vehicle',
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


export const vehicleMachineTypes = [
  {
    label:'Vehicle',
    value:'Vehicle'
  },
  {
    label:'Motorcycle',
    value:'Motorcycle'
  },
]

export const vehicleTypes = [
  {
    label:'Vehicle',
    value:'Vehicle'
  },
  {
    label:'Motorcycle',
    value:'Motorcycle'
  },
  {
    label:'Generator',
    value:'Generator'
  }
]

export const status = [
  {
    label:'Valid',
    value:'Valid'
  },
  {
    label:'InValid',
    value:'InValid'
  }
]