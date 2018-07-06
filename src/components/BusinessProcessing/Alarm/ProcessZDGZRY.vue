<template lang="html">
  <div class="listAlarm">
    <div class="top mb-6">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-button type="primary"  icon="el-icon-refresh" size="small">刷新</el-button>
        </el-col>
        <el-col :span="12" class="top-right">
          报警类型:
          <el-select v-model="value" placeholder="请选择"  size="small">
           <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
         出入境类别:
         <el-select v-model="value" placeholder="请选择"  size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="warning" icon="el-icon-zoom-in" size="small">筛选</el-button>
        </el-col>

      </el-row>

    </div>
    <div class="middle">
      <div class="title-green">
        甄别信息列表
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          prop="eventserial"
          label="事件编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="lastmatchtype"
          label="报警类别"
          width="160">

        </el-table-column>
        <el-table-column
          prop="flighttype"
          label="出入类别"
          width="130">
        </el-table-column>
        <el-table-column
          prop="numb"
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="name"
          label="人员姓名">
        </el-table-column>
        <el-table-column
          prop="nationality"
          label="国籍">
        </el-table-column>
        <el-table-column
          prop="fltno"
          label="航班号">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="报警时间">
        </el-table-column>
        <el-table-column
          prop="saveflag"
          label="当前状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain @click="$router.push({name:'alarmProcess'})">报警处理</el-button>
         </template>
        </el-table-column>
      </el-table>
      <div class="middle-foot">
        <div class="page-msg">
          <div class="">
            共10页
          </div>
          <div class="">
            每页
            <el-select v-model="value" placeholder="10" size="mini" class="page-select">
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
            共18条
          </div>
        </div>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="100"
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      tableData: [
        {
          "eventserial": "ba754edc095a45b5b73",
    			"lastmatchtype": "1",
    			"flighttype": 1514563200000,
    			"numb": 1546099200000,
    			"name": "1",
    			"nationality": 1,
    			"fltno": "1",
          "createtime": "1",
			    "saveflag": "1",
        }
      ]
    }

  },
  mounted(){
    // this.getList();
  },
  methods: {
    getList(){
      let p={};
      this.$api.post('/eamp/alarmEvents/getEventsInfo',p,
       r => {
         console.log(r);
         this.tableData=r.list
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
}
</script>

<style scoped>

  .top-right{
    text-align: right;
    font-size: 14px;
  }
  .middle{
    border-top: 3px rgb(75, 195, 160) solid;
  }



</style>
