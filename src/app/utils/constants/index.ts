import { ROUTES } from "../enum/routesEnum"

export const routes = {
    engine:'Engine',
    fuel: 'Feuls',
    filters: 'Filters',
    vehiclemachine:'Vehicle Machine',
    make:"Make",
    model:"Model",
    vehicle:"Vehicle",
    enginedetails:"Engine Detail",
    generator:"Generator",
    packages:"Packages",
    OilDetails :"Oil Detail",
    OilManfacture:'Oil Manufacture',
    year:'Year',
    corporateRequest : 'Corporate Request',
    color:'Color',
    business:'Business Type',
    testLocation :'Test Location',
    product:'Product'

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
      [ROUTES.fuel] : [
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
      [ROUTES.product] : [
        {
          title: 'Product Management',
          path: '/product-management/product',
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
      [ROUTES.enginedetails] : [
        {
          title: 'Engine Management',
          path: '/engine-detail-management/enginedetails',
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
      [ROUTES.OilDetails] : [
        {
          title: 'Oil Detail Management',
          path: '/oilDetails-management/oilDetails',
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
      [ROUTES.year] : [
        {
          title: 'Year Management',
          path: '/year-management/year',
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
      [ROUTES.corporateRequest] : [
        {
          title: 'Corporate Management',
          path: '/corporate-management/corporateRequest',
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
      [ROUTES.color] : [
        {
          title: 'Color Management',
          path: '/color-management/color',
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
      [ROUTES.business] : [
        {
          title: 'Business Management',
          path: '/business-management/business',
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
      [ROUTES.testLocation] : [
        {
          title: 'Test Location Management',
          path: '/test-location-management/testLocation',
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

export const CheckStatus = [
  {
    label:'Yes',
    value:'Yes'
  },
  {
    label:'No',
    value:'No'
  }
  
]

export const mileageType = [
  {
    label:'KM',
    value:'KM'
  },
  {
    label:'MILES',
    value:'MILES'
  }
]