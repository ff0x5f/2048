<template>
  <div id="app">
    <div>标题栏</div>
    <ul>
      <li><router-link to="/user">Go to user index!!!!</router-link></li>
      <li><router-link to="/about">Go to about</router-link></li>
      <li><router-link to="/game">Go to game</router-link></li>
    </ul>


<!--     <router-link to="/about">Go to about!!!!</router-link> -->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {

  },
}
</script>

<style lang="less">
html,body{
  height: 100%;
}
body{
  padding: 0;
  margin: 0;
  background: #fafafa;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  ul>li{
    list-style: none;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
