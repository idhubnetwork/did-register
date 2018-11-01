<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view/>
    <FooterBar></FooterBar>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'

export default {
  name: 'App',
  components: {
    NavBar, FooterBar
  }
}
</script>

<style lang="scss" scoped>
div {
  outline: none;
}
</style>

<style lang="scss">
h1 {
  &.title {
    color: #333f55;
    font-size: 36px;
  }
}

.control {
  input {
    background-color: #f6f6f6;
  }
}

.section {
  background-color: #f2f4f6;
}

.columns {
  background: #ffffff;
  padding: 30px 0;
  margin-top: 10px;
}
</style>
