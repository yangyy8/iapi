<template lang="html">
  <div class="basicInfo">
    <div class="middle">
      <div class="ak-tab mb-20">
        <div class="ak-tabs">
          <div class="ak-tab-item hand" :class="{'ak-checked':page==4}" @click="page=4;$router.push({name:'QueryRYXXZH'})">
            综合查询
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="page=1;$router.push({name:'QueryRYXXPL'})">
            批量查询
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':page==2}" @click="page=2;$router.push({name:'QueryRYXXZDY'})">
            自定义查询
          </div>
        </div>
        <div>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      page:4
    }
  },
  mounted(){
    console.log(1)
    let that = this;
    setTimeout(function(){
      that.$router.push({name:'QueryRYXXZH'})
    },1500)
  },
  activated(){
    console.log(3);
    let that = this;
    setTimeout(function(){
      that.$router.push({name:'QueryRYXXZH'})
    },1000)
  },
}
</script>

<style scoped>
.ak-tabs {
  display: flex;
}
.ak-checked {
  background: #fff!important;
  color: #399bfe!important;
  border: 1px #399bfe solid;
  border-bottom: 1px #fff solid;
  margin-bottom: -1px;
}
.ak-tab-item {
  background: #399bfe;
  color: #fff;
  font-size: 14px;
  margin-right: 6px;
  border-radius: 5px 5px 0 0;
  padding: 0 16px;
}
</style>
