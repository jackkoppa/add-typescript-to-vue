<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      {{' '}}|
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
// Import global styles once, at app level
@import "@/styles/global.scss";

#app {
  text-align: center;
  color: $cBlueGray;
}
#nav {
  padding: $spacer/2;
  a {
    font-weight: bold;
    color: $cBlueGray;
    &.router-link-exact-active {
      color: $cBrightGreen;
    }
  }
}
</style>
