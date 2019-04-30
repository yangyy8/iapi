<template lang="html">
  <div class="middle">
    <div class="pb-10 tc-333">
      <div class="title-green hand mt-10">
        详细信息
      </div>
      <div>
        <div class="box2-content mb-9">

          <el-row class="middle-msg-row2" :gutter="2">
            <el-col :span="12" v-for="(c1,ind) in list" :key="ind" >
              <!-- <el-tooltip effect="light" :content="c1.TARGET_NAME" placement="top-start" v-if="c1.TARGET_NAME">
                <span class="msg-t" :class="{'tc-999':!c1.TARGET_VALUE,'redx':c1.ISHIT==1}">{{c1.TARGET_NAME}}</span>
              </el-tooltip> -->
              <span class="msg-t" :class="{'tc-999':!c1.TARGET_VALUE,'redx':c1.ISHIT==1}">{{c1.TARGET_NAME}}</span>
              :
              <el-tooltip effect="light" :content="c1.TARGET_VALUE" placement="top-start" v-if="c1.TARGET_VALUE">
                <span class="msg-text" :class="{'tc-999':!c1.TARGET_VALUE,'redx':c1.ISHIT==1}">{{c1.TARGET_VALUE}}</span>
              </el-tooltip>
              <span class="msg-text":class="{'tc-999':!c1.TARGET_VALUE,'redx':c1.ISHIT==1}"  v-else>{{c1.TARGET_VALUE}}</span>

            </el-col>
          </el-row>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:[],
      nationality:'',
      flight_recordnum:'',
      passportno:'',

    }
  },
  activated(){
    this.nationality=this.$route.query.nationality;
    this.flight_recordnum=this.$route.query.flight_recordnum;
    this.passportno=this.$route.query.passportno;

    this.getData();
  },
  methods:{
    getData(){
      let p={
        nationality:this.nationality,
        passportno:this.passportno,
        // nationality:'chn',
        // passportno:'111111111',
        flight_recordnum:this.flight_recordnum,
      }
      this.$api.post('/manage-platform/riskIndexController/getIndexParInfo',p,
       r => {
         if(r.success){
           this.list=r.data;
         }
      })
    },
  }

}
</script>

<style lang="css" scoped>
</style>
