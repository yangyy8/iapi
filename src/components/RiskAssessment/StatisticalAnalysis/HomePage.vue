<template lang="html">
  <div class="">
    <div class="middle height" v-show="prompt">
      <span class="propClass">{{propmptText}}</span>
    </div>
    <div class="middle mb-2" v-for="(i,ind) in dataArr" :key="ind">
      <div class="map-title">{{i.titleText}}</div>
      <div style="position:relative">
        <el-button class="table-btn dz-btn" plain @click="cancel(i.version)">取消定制</el-button>
        <Vecharts :chartDatas="i" v-if="i.version" :chartsId="ind"></Vecharts>
        <el-table
          :data="i.tableData"
          border
          style="width: 100%;"
          class="homePage">
          <el-table-column
            :label="data" v-for="(data,key) in i.header" :key="key">
            <template slot-scope="scope">
                {{i.tableData[scope.$index][key]}}
            </template>
          </el-table-column>
        </el-table>
        <span style="color:#FFCF81">注：列表数据查看顺序&nbsp;&nbsp;&nbsp;&nbsp;{{i.prompt}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import Vecharts from './echart'
export default {
  components:{
    Vecharts
  },
  data(){
    return{
      liangChart:null,
      text:'',
      dataArr:[],
      propmptText:'',
      prompt:false
    }
  },
  activated() {
    this.getStart();
  },
  methods:{
    getStart(){
      this.$api.post('/manage-platform/census/customIndex',{},
       r =>{
         if(r.success){
           if(r.data.length==0){
             this.propmptText="提示：您还未定制图形，请前往“模型应用统计”定制图形";
             this.prompt = true;
           }else{
             this.prompt = false;
           }
           this.dataArr = [];
           for(var i=0;i<r.data.length;i++){
             this.$api.post('/manage-platform/census/queryCensusByQueryType',r.data[i],
              p =>{
                if(p.success){
                  this.dataArr.push(p.data)
                }
              })
           }
         }
       })
    },
    cancel(item){
      let p={
        'version':item
      }
      this.$api.post('/manage-platform/census/deleteCustom',p,
       r =>{
         if(r.success){
           this.$message({
             message: '删除成功！',
             type: 'success'
           });
         }
         this.getStart();

         console.log(this.dataArr)
       })
    }
  }
}
</script>

<style scoped>
.map-title{
  color: #71CEB2;
  font-size: 18px;
}
.dz-btn{
  position: absolute;
  right: 140px;
  top: 0px;
  height: 20px;
  line-height: 3px;
  z-index: 100;
}
.height{
  height: 100px;
  text-align: center;
  line-height: 100px;
}
.propClass{
  color: red;
  font-size: 13px;
}
</style>
