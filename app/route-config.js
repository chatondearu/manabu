export function configRouter (router) {
  router.map({
    '': {
      component: require('./components/Home.vue'),
      title: 'Home'
    },
    '/decks': {
      name: 'decks',
      component: require('./components/decks/List.vue'),
      title: 'Decks'
    },
    '/deck/:deckId': {
      name: 'deck',
      component: require('./components/cards/List.vue'),
      title: 'Deck'
    },
    '/profile': {
      name: 'profile',
      component: require('./components/user/Profile.vue'),
      title: 'Profile'
    },
    '/login': {
      name: 'login',
      component: require('./components/user/Login.vue'),
      title: 'Login'
    },
    '*': {
      component: require('./components/404.vue'),
      title: 'Not found'
    }
  })

  // redirect
  router.redirect({
    '/info': '/'
  })

  router.beforeEach((transition) => {
    // if (transition.to.path === '/forbidden') {
    //   router.app.authenticating = true
    //   setTimeout(() => {
    //     router.app.authenticating = false
    //     alert('this route is forbidden by a global before hook')
    //     transition.abort()
    //   }, 3000)
    // } else {
    //   transition.next()
    // }
    transition.next()
  })
}
