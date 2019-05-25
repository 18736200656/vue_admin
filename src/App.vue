<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  created(){

  },

}


</script>

<style>
html,body,
#app {
  margin:0;
  padding:0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

.el-table{
  height: 500px;
}

</style>
