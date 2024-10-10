import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    name: 'quotations',
    path: '/Quotations',
    component: () => import('@/pages/Quotations.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
  },
  {
    name: 'Login',
    path: '/account/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    name: 'material_request',
    path: '/Material_Request',
    component: () => import('@/pages/Material Request.vue'),
  },
  { path: '/orders',
     name: 'Orders', 
     component: () => import ('@/pages/Orders.vue') },
  {
    name: 'issue',
    path: '/Issues',
    component: () => import('@/pages/Issues.vue'),
  },
  {
    name: 'issueNew',
    path: '/Issue_new',
    component: () => import('@/pages/Issues New.vue'),
  },
  {
    name: 'addressNew',
    path: '/address_new',
    component: () => import('@/pages/Address New.vue'),
  },
  {
    name: 'IssueDetails',
    path: '/Issues/:id',
    component: () => import('@/pages/Issues Detail.vue'),
  },
  {
    name: 'AddressDetails',
    path: '/Addresses/:id',
    component: () => import('@/pages/Address Detail.vue'),
  },
  {
    name: 'addresses',
    path: '/Addresses',
    component: () => import('@/pages/Addresses.vue'),
  },
  {
    name: 'invoices',
    path: '/Invoices',
    component: () => import('@/pages/Invoices.vue'),
  },
  { path: '/Orders/:id',
     name: 'OrderDetails',
      component:() => import ('@/pages/Order Details.vue') 
    },
    {
      path:'/Quotations/:id',
      name:'QuotationDetails',
      component:() => import ('@/pages/Quotations Details.vue')
    },
    {
      path: '/Shipments',
      name: 'shipments', 
      component: () => import ('@/pages/shipments.vue')
    },    
    {
      path: '/Invoices/:id',
      name: 'InvoiceDetail', 
      component: () => import ('@/pages/Invoice Detail.vue')
    },
    {
      path: '/Shipments/:id',
      name: 'ShipmentDetails', 
      component: () => import ('@/pages/Shipment Details.vue')
    },
    {
      path: '/Material_Request/:id',
      name:'MaterialRDetails',
      component:() => import ('@/pages/Material Request Details.vue')
    },
    {
      path: '/Dashboard',
      name:'dashboard',
      component:() => import ('@/pages/Dashboards.vue')
    }
    

]

let router = createRouter({
  history: createWebHistory('/go1-customer'),
  routes,
})

router.beforeEach(async (to, from, next) => {
  let isLoggedIn = session.isLoggedIn
  try {
    await userResource.promise
  } catch (error) {
    isLoggedIn = false
  }

  if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' })
  } else if (to.name !== 'Login' && !isLoggedIn) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
