<template lang="html">
  <div class="basicInfo">
    <div class="middle">
      <div class="ak-tab mb-20">
        <div class="ak-tabs">
          <div class="ak-tab-item hand" :class="{'ak-checked':page==4}" @click="tiaozhuan(4,'QueryRYXXZH')">
            综合查询
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="tiaozhuan(1,'QueryRYXXPL')">
            批量查询
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':page==2}" @click="tiaozhuan(2,'QueryRYXXZDY')">
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
      page:4,
      url:'QueryRYXXZH',
      row:this.$route.query.row,
      begintime:this.$route.query.begintime,
      endtime:this.$route.query.endtime,
    }
  },
  mounted(){
    console.log(1);
    let that = this;
    setTimeout(function(){
      that.tiaozhuan(that.page,that.url)
    },500)
  },
  activated(){
    console.log(2)
    this.row = this.$route.query.row;
    this.begintime = this.$route.query.begintime;
    this.endtime = this.$route.query.endtime;
    if(this.row){
      this.tiaozhuan(4,'QueryRYXXZH');
    }else{
      let that = this;
      setTimeout(function(){
        that.tiaozhuan(that.page,that.url)
        // that.$router.push({name:that.url})
      },100)
    }

  },
  methods:{
    tiaozhuan(page,url){
      this.page=page;
      this.url=url;
      console.log('this.row2',this.row)
      this.$router.push({name:url,query:{row:this.row,begintime:this.begintime,endtime:this.endtime}})
    }
  }
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
