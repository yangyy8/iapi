<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  provide (){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isAlive:true
    }
  },
  methods:{
    reload(){
      this.isAlive = false
      this.$nextTick(function(){
        this.isAlive = true
      })
    }
  }
}
</script>

<style>
@import "assets/css/common.css";
@import "assets/css/commony.css";
@import "assets/css/commont.css";
@import "assets/icon/iconfont.css";
</style>
