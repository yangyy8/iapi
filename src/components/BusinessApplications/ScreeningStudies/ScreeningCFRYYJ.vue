
<template lang="html">
  <div class="zlbg">
    <div class="middle-top mb-2">

      <el-row type="flex" class="middle">
        <el-col :span="22" class="br pr-20">
          <div class="title-green">
            查询条件
          </div>

          <el-row align="center"   :gutter="2">
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
              <span class="input-text">时间范围：</span>
              <div class="input-input t-flex t-date">
               <el-date-picker
               v-model="pd.begin" format="yyyy-MM-dd HH:mm:ss"
               type="datetime" size="small" value-format="yyyyMMddHHmmss"
               placeholder="开始时间"  :picker-options="pickerOptions" >
             </el-date-picker>
               <span class="septum">-</span>
             <el-date-picker
                v-model="pd.end" format="yyyy-MM-dd HH:mm:ss"
                type="datetime" size="small" value-format="yyyyMMddHHmmss"
                placeholder="结束时间" :picker-options="pickerOptions1" >
            </el-date-picker>
          </div>
            </el-col>
            <el-col  :sm="24" :md="12" :lg="11"  class="input-item">
                <span class="input-text">目的地：</span>
                <el-select v-model="pd.NATIONS" filterable clearable @visible-change="queryNationality" placeholder="请选择"  size="small" class="input-input">
                  <el-option
                    v-for="item in nation"
                    :key="item.CODE"
                    :label="item.CODE+' - '+item.CNAME"
                    :value="item.CODE">
                  </el-option>
                </el-select>
            </el-col>


          </el-row>
        </el-col>
        <el-col :span="2" class="down-btn-area" style="margin-top:25px;">
          <el-button type="success" size="small" @click="getList(CurrentPage,pageSize,pd)">查询</el-button>
        </el-col>
      </el-row>
    </div>


    <div class="middle">
      <div class="ak-tab mb-20">
      <div class="ak-tabs">
        <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="base">
          重复订票
        </div>
        <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="batch">
          重复值机
        </div>
      </div>
    <div class="ak-tab-pane" >
        <div v-show="page==0">

            <el-table
              :data="tableData"
              border
              style="width: 100%;">
              <el-table-column
                prop="port"
                label="国籍">
              </el-table-column>
              <el-table-column
                prop="tbiapi"
                label="证件号码">
              </el-table-column>
              <el-table-column
                prop="tbfclose"
                label="姓名">
              </el-table-column>
              <el-table-column
                prop="tbfcancel"
                label="性别">
              </el-table-column>
              <el-table-column
                prop="tbchange"
                label="出生日期">
              </el-table-column>
              <el-table-column
                prop="tbintg"
                label="航班日期">
              </el-table-column>

              <el-table-column
                prop="average"
                label="航班号">
              </el-table-column>

              <el-table-column
                prop="average"
                label="出发地">
              </el-table-column>
              <el-table-column
                prop="average"
                label="到达地">
              </el-table-column>
              <el-table-column
                prop="average"
                label="口岸">
              </el-table-column>
              <el-table-column
                prop="average"
                label="操作">
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
        <div v-show="page==1">


                      <el-table
                        :data="tableData"
                        border
                        style="width: 100%;">
                        <el-table-column
                          prop="port"
                          label="国籍">
                        </el-table-column>
                        <el-table-column
                          prop="tbiapi"
                          label="证件号码">
                        </el-table-column>
                        <el-table-column
                          prop="tbfclose"
                          label="姓名">
                        </el-table-column>
                        <el-table-column
                          prop="tbfcancel"
                          label="性别">
                        </el-table-column>
                        <el-table-column
                          prop="tbchange"
                          label="出生日期">
                        </el-table-column>
                        <el-table-column
                          prop="tbintg"
                          label="航班日期">
                        </el-table-column>

                        <el-table-column
                          prop="average"
                          label="航班号">
                        </el-table-column>

                        <el-table-column
                          prop="average"
                          label="出发地">
                        </el-table-column>
                        <el-table-column
                          prop="average"
                          label="到达地">
                        </el-table-column>
                        <el-table-column
                          prop="average"
                          label="口岸">
                        </el-table-column>
                        <el-table-column
                          prop="average"
                          label="操作">
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
    </div>

  </div>
</template>
<script>
import {formatDate} from '@/assets/js/date.js'
import {dayGap} from '@/assets/js/date.js'
export default {
  data() {
    return {
      CurrentPage: 1,
      pageSize: 10,
      TotalResult: 0,
      pd: {begin:'',end:'',synFlag:'0',rzlx:'0'},
      nation: [],
      company: [],
      page:0,
      addDialogVisible: false,
      detailsDialogVisible: false,
      options: [{
          value: 10,
          label: "10"
        },
        {
          value: 20,
          label: "20"
        },
        {
          value: 30,
          label: "30"
        }
      ],
      tableData: [],
      multipleSelection: [],
      pickerOptions0: {
        disabledDate: (time) => {
            if (this.pd.end != null) {
              let startT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
              return startT > this.pd.end;
            }else if(this.pd.end == null){
              return false
            }
        }
      },
      pickerOptions1: {
        disabledDate: (time) => {
            let endT = formatDate(new Date(time.getTime()),'yyyyMMddhhmmss');
            return endT < this.pd.begin;
        }
      },
          form: {},

    }
  },
  mounted() {
    this.queryNationality();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    this.pd.begin = formatDate(beginz, 'yyyyMMddHHmmss');
    this.pd.end = formatDate(endz, 'yyyyMMddhhmmss');
    this.getList(this.CurrentPage, this.pageSize, this.pd);
  },
  activated(){
      this.queryNationality();
    let time = new Date();
    let endz = new Date();
    let beginz = new Date(time - 1000 * 60 * 60 * 24 * 1);
    this.pd.begin = formatDate(beginz, 'yyyyMMddhhmmss');
    this.pd.end = formatDate(endz, 'yyyyMMddhhmmss');
    this.getList(this.CurrentPage,this.pageSize,this.pd);
  },
  methods: {

    base(){
      this.page=0;
    },
    batch()
    {
    this.page=1;

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageSizeChange(val) {
      this.getList(this.CurrentPage, val, this.pd);
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.getList(val, this.pageSize, this.pd);

      console.log(`当前页: ${val}`);
    },
    getList(currentPage, showCount, pd) {
      // this.pd.begin=formatDate(this.pd.begin,"yyyyMMddhhssmm");
      // this.pd.end=formatDate(this.pd.end,"yyyyMMddhhssmm");
      if(dayGap(this.pd.begin,this.pd.end,0)>1){
        this.$alert('只能查询某一天的日期', '提示', {
          confirmButtonText: '确定',
        });
        return false
      }

      let p = {
        "currentPage": currentPage,
        "showCount": showCount,
        "cdt": pd
      };

      this.$api.post("/manage-platform/log_event/queryListPageAll", p,
        r => {
          console.log(r);
          this.tableData = r.data.pd.resultList;
          this.TotalResult = r.data.totalResult;
        })
    },
    queryNationality() {
      this.$api.post('/manage-platform/codeTable/queryNationality', {},
        r => {
          console.log(r);
          if (r.success) {
            this.nation = r.data;
          }
        })
    },
    details(i) {
      this.detailsDialogVisible = true;
      console.log(i);
      this.form=i;
    },
  }
}
</script>

<style scoped>
.ak-tab {}

.ak-tabs {
  display: flex;

}

.ak-tab-item {
  background: #399bfe;
  color: #fff;
  font-size: 14px;
  margin-right: 6px;
  border-radius: 5px 5px 0 0;
  padding: 0 16px;
}

.ak-checked {
  background: #fff;
  color: #399bfe;
  border: 1px #399bfe solid;
  border-bottom: 1px #fff solid;
  margin-bottom: -1px;
}

.ak-tab-pane {
  border: 1px #399bfe solid;
  padding: 20px;
  border-radius: 0 5px 5px 5px;
}


</style>
