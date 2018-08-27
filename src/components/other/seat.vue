<template lang="html">
<div id="div2">
  <el-row align="center"  type="flex">
    <el-col  :span="5" style="border-right:1px solid #cccccc; margin-right:30px;">
        <img src="../../assets/img/port.png">
    </el-col>
    <el-col  :span="190" style="padding-top:50px;">
      <ul class="planUL">
        <li class="planLifirst">
          <div  v-for="i in list1">
            {{i}}
          </div>
        </li>
        <li v-for="i in list2" class="planLi">
          <div class="" > </div>
          <div class="">{{i}}</div>
        </li>
      </ul>
    </el-col>
  </el-row>
</div>
    </div>
  </div>
</template>

<script>
import {formatDate} from '@/assets/js/date.js'
export default {
  data() {
    return {
      list1:[],
      list2:[],
      form: {},
      departdateBegin:''
    }
  },
  created(){
    let _this=this;
    setTimeout(function(){
      _this.getimgtable()
    },500)
  },
  // mounted(){
  //   this.getimgtable()
  // },
  methods: {
    getimgtable(){
      let departdateBegin = formatDate(new Date(this.$route.query.departdateBegin),'yyyyMMddhhmm');
      let p = {
        "flightNumber": this.$route.query.flightNumber,
        "departdateBegin": departdateBegin,
      };
      this.$api.post('/manage-platform/statusUpdate/seat/queryListPagesSeatList', p,
        r => {
          console.log(r);
          this.list1 = r.data.list123;
          this.list2 = r.data.listabc;
        })
    },

  },
}
</script>

<style scoped>
.add-dialog {
  /* padding-left:40px; */
}
.detail-msg-row {
  color: #999;
  line-height: 32px;
}
.detail-msg-row span {
  color: #333;
  display: inline-block;
  width: 60px;
}
.planUL{
  display: flex;
  /* flex-direction:column; */
}
.planLi{
  display: flex;
  margin: 5px;
  flex-direction: column;
}
/* .planLi:first-child div{
  border: none;
  background: none
} */
.planLi div{
  width: 20px;
  height: 20px;
  border: 1px #105D93 solid;
  background: #70BDEB; text-align: center;
}
.planLifirst{
  display: flex;
  margin: 5px;
  flex-direction: column;
}
.planLifirst div{
  width: 20px;
  height: 20px;
  text-align: center;

}
.planLi div:last-child{
  border: none;
  background: none;text-align: center;
}

</style>
