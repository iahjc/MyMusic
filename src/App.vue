<template>
  <div id="app">
    <nav-slidebar></nav-slidebar>
    <router-view/>
  </div>
</template>

<script>
import NavSlidebar from 'components/nav-slidebar/nav-slidebar'
export default {
  name: 'app',
  components: {
    NavSlidebar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
