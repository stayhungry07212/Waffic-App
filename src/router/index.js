import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AccountDetails from '@/components/AccountDetails'
import Help from '@/components/Help'
import History from '@/components/History'
import News from '@/components/News'
import Collaboration from '@/components/Collaboration'
import Map from '@/components/Map'
import AuthGuard from '@/store/authGuard'
import UserCollaborationsHistory from '@/components/UserCollaborationsHistory'
import ReceivedMessages from '@/components/ReceivedMessages'
import UsersHistory from '@/components/UsersHistory'
import Statistics from '@/components/Statistics'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/AccountDetails',
      name: 'AccountDetails',
      component: AccountDetails,
      beforeEnter: AuthGuard
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search,
      beforeEnter: AuthGuard
    },
    {
      path: '/Statistics',
      name: 'Statistics',
      component: Statistics,
      beforeEnter: AuthGuard
    },
    {
      path: '/UserCollaborationsHistory/:id',
      name: 'UserCollaborationsHistory',
      component: UserCollaborationsHistory,
      beforeEnter: AuthGuard
    },
    {
      path: '/UsersHistory/:id',
      name: 'UsersHistory',
      component: UsersHistory,
      beforeEnter: AuthGuard
    },
    {
      path: '/ReceivedMessages',
      name: 'ReceivedMessages',
      component: ReceivedMessages,
      beforeEnter: AuthGuard
    },
    {
      path: '/Map',
      name: 'Map',
      component: Map,
      beforeEnter: AuthGuard
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Help',
      name: 'Help',
      component: Help
    },
    {
      path: '/History',
      name: 'History',
      component: History,
      beforeEnter: AuthGuard
    },
    {
      path: '/News',
      name: 'News',
      component: News
    },
    {
      path: '/Collaboration',
      name: 'Collaboration',
      component: Collaboration
    }
  ]
})
