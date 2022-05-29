<template>
  <div id="flashMessage" v-if="GStore.flashMessage">
    <div>
      {{ GStore.flashMessage }}
    </div>
  </div>
  <nav>
    <router-link :to="{ name: 'event-list' }">Events</router-link> |
    <router-link :to="{ name: 'about' }">About</router-link>
  </nav>
  <router-view/>
</template>

<script>
export default {
  inject: ['GStore'],
};
</script>

<style>
@keyframes yellowfade {
  from {
    background: #ff0;
    border-color: #cc0;
  }
  to {
    background: transparent;
    border-color: transparent;
  }
}

#flashMessage {
  text-align: center;
}

#flashMessage div {
  display: inline-block;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid transparent;
  animation-name: yellowfade;
  animation-duration: 3s;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h4 {
  font-size: 20px;
}
</style>
