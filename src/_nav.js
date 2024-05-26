import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDescription,
  cilSpeedometer,
  cilGroup,
  cilUser,
  cilUserPlus,
  cilAddressBook,
  cilContact,
  cilPlaylistAdd,
  cilBasket,
  cilBook,
  cilBusAlt
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Management'
  },
  {
    component: CNavGroup,
    name: 'Communities',
    to: '/communities',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Community',
        to: '/communities/community',
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
      }
    ]
  },
  {
    component: CNavGroup,
    name: 'Customers',
    to: '/customers',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Customer',
        to: '/customers/customer',
        icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Product',
        to: '/customers/productbycustomer',
        icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
      }
    ]
  },{
    component: CNavGroup,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Car',
        to: '/users/car',
        icon: <CIcon icon={cilBusAlt} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Publication',
        to: '/users/publication',
        icon: <CIcon icon={cilPlaylistAdd} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'User',
        to: '/users/user',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      }
    ]
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
