<template lang="html">
  <div class="rank">
       <table class="r-table2" cellspacing="0">
         <tr>
          <th width="10%"><div>序号</div></th>
          <th><div class="male">昵称</div></th>
          <th><div class="male">单位名称</div></th>
          <th width="25%"><div class="male">点赞数</div></th>
         </tr>

         <tr>
           <td><div class="div c1">TOP1</div></td>
           <td><div class="rx"><img src="../../../../assets/img/tx1.png">&nbsp;张先生</div></td>
           <td>北京航空航天</td>
           <td><div class="rx1"><img src="../../../../assets/img/zan.png"> (24512) </div></td>
         </tr>
         <tr>
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
         </tr>
       </table>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

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
</style>
