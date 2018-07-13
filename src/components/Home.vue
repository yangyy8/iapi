<template>
  <el-container class="home">

    <el-main>
      <div class="home-top">
        <div class="home-top-left">
          总站 <span>[切换]</span> 07月13日 周五 多云 16℃~36℃ 
        </div>
        <div class="home-top-right">

        </div>
      </div>
      <el-tag><router-link :to="{ name: 'Content', query: {navId:1} }">业务处理</router-link></el-tag>
      <el-tag><router-link :to="{ name: 'Content', query: {navId:2} }">业务应用</router-link></el-tag>
      <el-tag><router-link :to="{ name: 'Content', query: {navId:3} }">业务管理</router-link></el-tag>
      <!-- <el-tag><router-link to="/foo">业务管理</router-link></el-tag> -->
      <el-tag><router-link :to="{ name: 'Content', query: {navId:4} }">业务监控</router-link></el-tag>
      <el-tag><router-link :to="{ name: 'Content', query: {navId:5} }">系统管理</router-link></el-tag>
      <el-tag><router-link :to="{ name: 'Content', query: {navId:6} }">系统监控</router-link></el-tag>
      <!-- <el-tag><router-link :to="{ name: 'Content', query: {navId:1} }">自定义设置</router-link></el-tag> -->
    </el-main>


  </el-container>
</template>

<script>


export default {
  name: 'home',
  created(){
    // this.fn1()
  },
  data () {
    return {
      msg: 'Welcome !!!',
      tableData:[],

    }
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.home{
  width: 100%;
  height: 100%;
  background: url('../assets/img/home/bg.png');
  background-size: 100% 100%;
}
</style>
