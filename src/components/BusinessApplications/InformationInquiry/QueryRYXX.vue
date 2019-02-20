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
      row:this.$route.query.row
    }
  },
  mounted(){
    // let that = this;
    // setTimeout(function(){
    //   that.tiaozhuan(4,that.url)
    //
    //   // that.$router.push({name:'QueryRYXXZH'})
    // },500)
  },
  activated(){
    this.row = this.$route.query.row
    console.log('this.row1',this.row)
    let that = this;
    setTimeout(function(){
      that.tiaozhuan(4,that.url)
      // that.$router.push({name:that.url})
    },500)
  },
  methods:{
    tiaozhuan(page,url){
      this.page=page;
      this.url=url;
      // this.row=row;
      console.log('this.row2',this.row)
      this.$router.push({name:url,query:{row:this.row}})
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
