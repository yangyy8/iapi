<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-table
      :data="tableData"
      border
      style="width: 100%;">
      <el-table-column
        prop="CREATETIME"
        label="CREATETIME"
        width="180">
      </el-table-column>
      <el-table-column
        prop="FIELDDESC"
        label="FIELDDESC"
        width="180">
      </el-table-column>
      <el-table-column
        prop="FIELDNAME"
        label="FIELDNAME">
      </el-table-column>
      <el-table-column
        prop="FIELDTYPE"
        label="FIELDTYPE">
      </el-table-column>
      <el-table-column
        prop="OPERATORCHARACTER"
        label="OPERATORCHARACTER">
      </el-table-column>
      <el-table-column
        prop="SERIAL"
        label="SERIAL">
      </el-table-column>
      <el-table-column
        prop="SYNFLAG"
        label="SYNFLAG">
      </el-table-column>
      <el-table-column
        prop="VALUE"
        label="VALUE">
      </el-table-column>
    </el-table>
    <el-row>
      <el-button type="primary" @click="fn1">刷新</el-button>
    </el-row>
    <el-tag><router-link :to="{ name: 'Content', query: {navId:1} }">业务处理</router-link></el-tag>
    <el-tag><router-link :to="{ name: 'Content', query: {navId:2} }">业务应用</router-link></el-tag>
    <el-tag><router-link :to="{ name: 'Content', query: {navId:3} }">业务管理</router-link></el-tag>
    <!-- <el-tag><router-link to="/foo">业务管理</router-link></el-tag> -->
    <el-tag><router-link :to="{ name: 'Content', query: {navId:4} }">业务监控</router-link></el-tag>
    <el-tag><router-link :to="{ name: 'Content', query: {navId:5} }">系统管理</router-link></el-tag>
    <el-tag><router-link :to="{ name: 'Content', query: {navId:6} }">系统监控</router-link></el-tag>
    <!-- <el-tag><router-link :to="{ name: 'Content', query: {navId:1} }">自定义设置</router-link></el-tag> -->

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
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
    fn1(){
      console.log("iiiiiii")
      this.$api.post('/eamp/dataCheck/getDataCheckPage',
       {"showCount":10,"currentPage":0},
       r => {
         console.log(r);
         this.tableData=r.Data.DataChecks;
      })

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
