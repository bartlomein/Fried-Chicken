<template>
  <div id="app">
    <Address/>
  </div>
</template>

<script>
import Address from './components/Address.vue'

export default {
  name: 'app',
  components: {
    Address
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
