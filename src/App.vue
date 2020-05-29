<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Weekly To-do List</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Lato', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#app {
  color: #0d1e44;
  margin: auto;
  padding: 30px;
  text-align: center;
}
#single-date-picker {
  margin: auto;
}
h1 {
  color: #c7a3b5;
  background: linear-gradient(to right, #e0caca, #d4b8ca, #c7a3b5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 60px;
  font-weight: 300;
  font-family: 'Lato', Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
