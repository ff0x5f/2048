export default [{
  path: '/',
  name: 'index',
  component: require('./components/Game')
}, {
  path: '/game',
  name: 'game',
  component: require('./components/Game')
}, {
  path: '/about',
  name: 'about',
  component: require('./components/DemoAbout')
}, {
  path: '/user',
  name: 'user',
  component: require('./components/User')
}, {
  path: '/user/:id',
  name: 'usersetting',
  component: require('./components/User/Settings')
}, {
  path: '*',
  name: '404',
  component: require('./components/NotFundPage')
}]
