import { createRouter, createWebHistory } from 'vue-router'
import { session } from './data/session'
import { userResource } from '@/data/user'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: { name: 'Dashboard' },
  },
  {
    name: 'Login',
    path: '/account/login',
    component: () => import('@/pages/Login.vue'),
  }, 
  {
    name: 'Dashboard',
    path: '/Dashboard',
    component: () => import('@/pages/Dashboard.vue'),
  },
  {
    name: 'Quotations',
    path: '/Quotations',
    component: () => import('@/pages/Quotations.vue'),
  },
  {
    name: 'QuotationDetails',
    path: '/Quotations/:id',
    component: () => import('@/pages/Quotation Details.vue'),
  },  
  {
    name: 'Invoices',
    path: '/Invoices',
    component: () => import('@/pages/Invoices.vue'),
  },
  {
    name: 'InvoiceDetails',
    path: '/Invoices/:id',
    component: () => import('@/pages/Invoice Details.vue'),
  },
  {
    name: 'Shipments',
    path: '/Shipments',
    component: () => import('@/pages/Shipment.vue'),
  },
  {
    name: 'ShipmentsDetails',
    path: '/Shipments/:id',
    component: () => import('@/pages/Shipments Details.vue'),
  },
  {
    name: 'Orders',
    path: '/Orders',
    component: () => import('@/pages/Orders.vue'),
  },
  {
    name: 'OrderDetails',
    path: '/Orders/:id',
    component: () => import('@/pages/Order Details.vue'),
  },
  {
    name: 'Addresses',
    path: '/Addresses',
    component: () => import('@/pages/Addresses.vue'),
  },
  {
    name: 'Address New',
    path: '/Address_New',
    component: () => import('@/pages/Address New.vue'),
  },
  {
    name: 'AddressDetails',
    path: '/AddressDetails/:id',
    component: () => import('@/pages/Address Details.vue'),
  },
  {
    name: 'Issues',
    path: '/Issues',
    component: () => import('@/pages/Issue.vue'),
  },
  {
    name: 'IssueNew',
    path: '/Issue_New',
    component: () => import('@/pages/IssueNew.vue'),
  },
  {
    name: 'IssueDetails',
    path: '/IssueDetails/:id',
    component: () => import('@/pages/Issue Details.vue'),
  },
  {
    name: 'Projets',
    path: '/Projects',
    component: () => import('@/pages/Projects.vue'),
  },
  {
    name: 'ProjectDetails',
    path: '/Projects/:id',
    component: () => import('@/pages/Project Details.vue'),
  },

]

let router = createRouter({  
  history: createWebHistory('/Go1_Customer'),
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
