<template lang="html">
  <div class="rank">
       <table class="r-table2" cellspacing="0">
         <tr>
          <th width="10%"><div>序号</div></th>
          <th><div class="male">昵称</div></th>
          <th><div class="male">单位名称</div></th>
          <th width="25%"><div class="male">点赞数</div></th>
         </tr>

         <tr v-for="(site,ind) in tableData">
           <td>
             <div class="div c1" v-if='(ind+1)==1'>TOP{{ind+1}}</div>
             <div class="div c2" v-else-if='(ind+1)==2'>TOP{{ind+1}}</div>
             <div class="div c3" v-else-if='(ind+1)==3'>TOP{{ind+1}}</div>
             <div class="div c4" v-else>TOP{{ind+1}}</div>
           </td>
           <td><div class="rx"><img src="../../../../assets/img/tx1.png">&nbsp;{{site.NICKNAME}}</div></td>
           <td>{{site.DEPARTMENTNAME}}</td>
           <td><div class="rx1"><img src="../../../../assets/img/zan.png">  {{site.CREDITNUMBER}} </div></td>
         </tr>
         <!-- <tr>
           <td><div class="div c2">TOP2</div></td>
           <td><div class="rx"><img src="../../../../assets/img/tx1.png">&nbsp;呼呼哈</div></td>
           <td>北京航空航天</td>
           <td><div class="rx1"><img src="../../../../assets/img/zan.png"> (24512) </div></td>
         </tr>
         <tr>
           <td><div class="div c3">TOP3</div></td>
           <td><div class="rx"><img src="../../../../assets/img/tx.png">&nbsp;统统统</div></td>
           <td>北京航空航天</td>
           <td><div class="rx1"><img src="../../../../assets/img/zan.png"> (24512) </div></td>
         </tr> -->
       </table>

       <!-- <div class="middle-foot">
         <div class="page-msg">
           <div class="">
             共{{Math.ceil(TotalResult/pageSize)}}页
           </div>
           <div class="">
             每页
             <el-select v-model="pageSize" @change="pageSizeChange(pageSize)" placeholder="10" size="mini" class="page-select">
               <el-option
                 v-for="item in options"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
               </el-option>
             </el-select>
             条
           </div>
           <div class="">
             共{{TotalResult}}条
           </div>
         </div>
         <el-pagination
           background
           @current-change="handleCurrentChange"
           :current-page.sync ="CurrentPage"
           :page-size="pageSize"
           layout="prev, pager, next"
           :total="TotalResult">
         </el-pagination>
       </div> -->

  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

      airport:[],
      backShow:false,
      fileList:[],
      CurrentPage:1,
      pageSize:6,
      TotalResult:0,
      tableData:[],
      pd: {}
    }
  },

  activated(){
    this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  mounted() {
this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  methods:{
    pageSizeChange(val) {
      if(this.backShow){
        this.getHisFn(this.CurrentPage,val,this.pd);

      }else{
        this.getList(this.CurrentPage,val,this.pd);
      }
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      if(this.backShow){
        this.getHisFn(val,this.pageSize,this.pd);
      }else{
        this.getList(val,this.pageSize,this.pd);

      }
      console.log(`当前页: ${val}`);
    },

    getList(currentPage,showCount,pd){
      let p={
        "currentPage":currentPage,
        "showCount":showCount,
        "pd":pd
      };
      console.log(pd)

      this.$api.post('/manage-platform/itemForum/getItemForumCommentRankingPage',p,
       r => {
         console.log(r);
         this.tableData=r.data.resultList;
         this.TotalResult=r.data.totalResult;
      })
    }

  }

}
</script>

<style scoped>
.rank{background: #ffffff; min-height: 750px;}
.r-table2 {
  width: 85%; margin: 0 auto;  border: 0;

}

.r-table2 tr {
  height: 80px;
}

.r-table2 th {
padding: 0 !important;  vertical-align:bottom; color: #666; font-weight:500;
}
.r-table2 th div{
  border-bottom: 2px solid #A7D2FF; line-height: 30px;
}
.male{margin-left: 5px;}
.r-table2 td{
  border-bottom: 1px solid #DDDDDD;padding: 0 !important;color: #666;
}
.r-table2 td .div{border-radius: 20px; height: 20px; width:60px!important; margin-left: 25%;color: #fff; line-height: 20px; text-align: center;}
.r-table2 td .rx{ height: 54px;vertical-align:top;line-height: 54px;}
.r-table2 td .rx1{ height: 18px;vertical-align:top;line-height: 18px;}
.c1{background: #E23E3F; }
.c2{background: #F19147;}
.c3{background: #31B36D;}
.c4{background: #9A9A9A;}
</style>
