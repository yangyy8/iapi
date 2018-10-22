<template lang="html">
  <div class="eventbjsj">
    <div class="middle mb-6">
        <el-row type="flex">
          <el-col :span="20" class="pr-20">
            <el-row align="center" :gutter="2">
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">证件号：</span>
                <el-input placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航班号：</span>
                <el-input placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">国籍：</span>
                <el-select  placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value="A"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-collapse-transition>
            <el-row align="center" :gutter="2" v-if="moreShow">
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">姓名：</span>
                <el-input placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">出生日期：</span>
                <div class="input-input t-flex t-date">
                  <el-date-picker
                   type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                   value-format="yyyyMMddHHmm"
                   placeholder="开始时间" >
                  </el-date-picker>
                  <span class="septum">-</span>
                  <el-date-picker
                    type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                    value-format="yyyyMMddHHmm"
                    placeholder="结束时间">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">航班日期：</span>
                <div class="input-input t-flex t-date">
                  <el-date-picker
                   type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                   value-format="yyyyMMddHHmm"
                   placeholder="开始时间" >
                  </el-date-picker>
                  <span class="septum">-</span>
                  <el-date-picker
                    type="datetime" size="small" format="yyyy-MM-dd HH:mm"
                    value-format="yyyyMMddHHmm"
                    placeholder="结束时间">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">证件类型：</span>
                <el-select  placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value="A"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">历次风评：</span>
                <div class="input-input t-flex t-date">
                  <el-input-number size="small"></el-input-number>
                  <span class="septum">-</span>
                  <el-input-number size="small"></el-input-number>
                </div>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">命中模型：</span>
                <el-select  placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value="A"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">出入标识：</span>
                <el-select  placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value="A"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">中心/口岸事件：</span>
                <el-select  placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value="A"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12"  :lg="8" class="input-item">
                <span class="input-text">当前状态：</span>
                <el-select  placeholder="请选择"  size="small" clearable filterable class="block input-input">
                  <el-option label="I - 入境" value="I"></el-option>
                  <el-option label="O - 出境" value="O"></el-option>
                  <el-option label="A - 入出境" value="A"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">推送人：</span>
                <el-input placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">处理人：</span>
                <el-input placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
              <el-col :sm="24" :md="12" :lg="8" class="input-item">
                <span class="input-text">本事件核查次数：</span>
                <el-input placeholder="请输入内容" size="small" clearable class="input-input"></el-input>
              </el-col>
            </el-row>
            </el-collapse-transition>
          </el-col>
          <el-col :span="2" class="down-btn-area">
            <el-button type="text" size="small" @click="moreShow=true" v-if="!moreShow">高级查询 ></el-button>
            <el-button type="text" size="small" @click="moreShow=false" v-if="moreShow">收起<</el-button>
          </el-col>
          <el-col :span="2" class="down-btn-area">
            <el-button type="success" size="small" >查询</el-button>
            <!-- <el-button type="primary" plain size="small" >重置</el-button> -->
          </el-col>
        </el-row>
    </div>
    <div class="middle t-table">
      <div class="" >
        <el-table
          class="mt-10"
          ref="multipleTable"
          :data="tableData"
          border
          @selection-change="handleSelectionChange"
          style="width: 100%;">
          <el-table-column
           fixed
           width="40"
           type="selection">
          </el-table-column>
          <el-table-column
            label="事件编号">
          </el-table-column>
          <el-table-column
            label="姓名">
          </el-table-column>
          <el-table-column
            label="出入标识">
          </el-table-column>
          <el-table-column
            label="性别">
          </el-table-column>
          <el-table-column
            label="出生日期">
          </el-table-column>
          <el-table-column
            label="国籍">
          </el-table-column>
          <el-table-column
            label="证件类型">
          </el-table-column>
          <el-table-column
            label="证件号">
          </el-table-column>
          <el-table-column
            label="航班号">
          </el-table-column>
          <el-table-column
            label="航班日期">
          </el-table-column>
          <el-table-column
            label="命中模型">
          </el-table-column>
          <el-table-column
            label="命中规则">
          </el-table-column>
          <el-table-column
            label="中心/口岸"
            width="100">
          </el-table-column>
          <el-table-column
            label="风险等级">
          </el-table-column>
          <el-table-column
            label="处理人">
          </el-table-column>
          <el-table-column
            label="当前状态">
          </el-table-column>
          <el-table-column
            label="核查次数">
          </el-table-column>
          <el-table-column
            label="最新核查结果"
            width="120">
          </el-table-column>
          <el-table-column
            label="历次风评">
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" class="a-btn" icon="el-icon-view" title="查看" @click="$router.push({name:'BJSJCK'})"></el-button>
              <el-button type="text" class="a-btn" icon="el-icon-edit-outline"  title="归档追加"></el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="middle-foot">
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
            :page-size="pageSize"
            layout="prev, pager, next"
            :total="TotalResult">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      moreShow:false,
      page: 0,
      multipleSelection:null,
      tableData:[{}],
      CurrentPage:1,
      pageSize:10,
      TotalResult:0,
      pd:null,
      airport:null,
      options:[
        {
          value:10,
          label:"10"
        },
        {
          value:20,
          label:"20"
        },
        {
          value:30,
          label:"30"
        }
      ],
    }
  },
  mounted(){
    // this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  methods:{
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  }
}
</script>

<style scoped>


</style>
