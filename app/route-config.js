export const routesMap = [
  {
    path: '/',
    component: require('./components/Home.vue'),
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/decks',
    name: 'decks',
    component: require('./components/decks/List.vue'),
    meta: {
      title: 'Decks'
    }
  },
  {
    path: '/deck/:deckId',
    name: 'deck',
    component: require('./components/cards/List.vue'),
    meta: {
      title: 'Deck'
    }
  },
  {
    path: '/info',
    redirect: '/'
  },
  {
    path: '/profile',
    name: 'profile',
    component: require('./components/user/Profile.vue'),
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: require('./components/user/Login.vue'),
    meta: {
      title: 'Login'
    }
  },
  {
    path: '*',
    component: require('./components/404.vue'),
    meta: {
      title: 'Not found'
    }
  }
]

export function configRouter (router) {
  router.beforeEach((route, redirect, next) => {
    // router.app.$root
    next()
  })
}
