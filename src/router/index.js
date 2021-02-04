import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/loginagent',
    name: 'LoginAgent',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "loginagent" */ '../views/LoginAgent.vue')
  },
  {
    path: '/loginbusiness',
    name: 'LoginBusiness',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "loginbusiness" */ '../views/LoginBusiness.vue')
  },
  {
    path: '/registeragent',
    name: 'RegisterAgent',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "registeragent" */ '../views/RegisterAgent.vue')
  },
  {
    path: '/businessdashboard',
    name: 'BusinessDashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "businessdashboard" */ '../views/BusinessDashboard.vue')
  },
  {
    path: '/agentdashboard',
    name: 'AgentDashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "agentdashboard" */ '../views/AgentDashboard.vue'),
    children: [
      {
        path: '/contact',
        name: 'Contact',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "contact" */ '../components/Contact.vue')
      },
      {
        path: '/',
        name: 'Lead',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "lead" */ '../components/Lead.vue')
      },
      {
        path: '/ticketdashboard',
        name: 'TicketDashBoard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "ticketdashboard" */ '../views/TicketDashBoard.vue')
      }
    ]
  },
  {
    path: '/convertlead',
    name: 'ConvertLead',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "convertlead" */ '../views/ConvertLead.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
