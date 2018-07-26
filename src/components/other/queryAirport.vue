<!--机场、口岸封装-->
<template lang="html">
  <el-select v-model="airportModel"  filterable clearable @visible-change="queryAirport" placeholder="请选择"  size="small" class="input-input">
    <el-option
      v-for="item in airport"
      :key="item.AIRPORT_CODE"
      :label="item.AIRPORT_CODE+' - '+item.AIRPORT_NAME"
      :value="item.AIRPORT_CODE">
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: {
      airportModel: {
          type: String,
          default: ''
      }
  },
  data(){
    return{
      airport:[]
    }
  },
  methods: {
    queryAirport(){
      this.$api.post('/manage-platform/codeTable/queryAirport',{},
       r => {
         console.log(r);
         if(r.success){
           this.airport=r.data;
           this.$emit('transAirport',this.airportModel)
         }
      })
    },
  }
}
</script>
