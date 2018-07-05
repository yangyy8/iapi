<template lang="html">
  <div class="basicInfo">
    <div class="middle">
      <div class="ak-tab mb-20">
          <el-row type="flex" style="height:100%" v-show="akCheckId==1">
            <el-col :span="22" class="br flex-c">
              <div class="title-green ">
                查询条件
              </div>
              <el-row type="flex" class="mb-6">
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">业务事件类型：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">创建日期：</span>
                  <div class="block">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                      size="small">
                    </el-date-picker>
                  </div>
                </el-col>

                <el-col :span="6" class="input-item">
                  <span class="inpt-text">姓名：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">性别：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>
              </el-row>
              <el-row type="flex" class="mb-6">
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">出生日期：</span>
                  <div class="block">
                    <el-date-picker
                      v-model="value1"
                      type="date"
                      placeholder="选择日期"
                      size="small">
                    </el-date-picker>
                  </div>
                </el-col>
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">国籍：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>

                <el-col :span="6" class="input-item">
                  <span class="inpt-text">证件号码：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">出入标识：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
              <el-row type="flex" class="mb-6">
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">航班号：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="t-input-item">
                  <span class="inpt-text">航班日期：</span>
                  <el-date-picker
                    v-model="value6"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini"
                    class="flightDate">
                  </el-date-picker>
                </el-col>

                <el-col :span="6" class="input-item">
                  <span class="inpt-text">业务事件编号：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">反馈状态：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="2" class="down-btn-area">
              <el-button type="success" class="mb-15" size="small">查询</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" style="height:100%" v-show="akCheckId==2">
            <el-col :span="22" class="bd0">
              <div class="akcheck2top boder1">
                <el-button type="primary" plain size="mini" >主要按钮</el-button>
                <el-button type="primary" plain size="mini">主要按钮</el-button>
              </div>
              <div class="akUl">
                <el-row type="flex" class="ak-li boder1">
                  <img src="../../../assets/img/hook.png" alt="">

                  <el-col :span="6">
                    <span class="inpt-text">处理结果：</span>
                    <el-select v-model="value" placeholder="请选择"  size="small">
                      <el-option>
                      </el-option>
                    </el-select>
                  </el-col>
                  <span class="mr-20">+</span>
                  <el-col :span="6" class="input-item">
                    <span class="inpt-text">处理人：</span>
                    <el-input placeholder="请输入内容" size="small"></el-input>
                  </el-col>
                  <el-button type="primary" plain size="mini" >添加</el-button>

                </el-row>
                <el-row type="flex" class="ak-li boder1">
                  <img src="../../../assets/img/hook.png" alt="">

                  <el-col :span="6">
                    <span class="inpt-text">处理结果：</span>
                    <el-select v-model="value" placeholder="请选择"  size="small">
                      <el-option>
                      </el-option>
                    </el-select>
                  </el-col>
                  <span class="mr-20">+</span>
                  <el-col :span="6" class="input-item">
                    <span class="inpt-text">处理人：</span>
                    <el-input placeholder="请输入内容" size="small"></el-input>
                  </el-col>
                  <el-button type="warning" plain size="mini" >删除</el-button>

                </el-row>
                <el-row type="flex" class="ak-li boder1">
                  <img src="../../../assets/img/hook.png" alt="">

                  <el-col :span="6">
                    <span class="inpt-text">处理结果：</span>
                    <el-select v-model="value" placeholder="请选择"  size="small">
                      <el-option>
                      </el-option>
                    </el-select>
                  </el-col>
                  <span class="mr-20">+</span>
                  <el-col :span="6" class="input-item">
                    <span class="inpt-text">处理人：</span>
                    <el-input placeholder="请输入内容" size="small"></el-input>
                  </el-col>
                  <el-button type="warning" plain size="mini" >删除</el-button>

                </el-row>
              </div>
            </el-col>
            <el-col :span="2" class="down-btn-area">
              <el-button type="success" class="mb-15" size="small">查询</el-button>
              <el-button type="primary" plain size="small">重置</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" style="height:100%" v-show="akCheckId==3">
            <el-col :span="22" class="br flex-c">
              <el-row type="flex">
                <el-col :span="6">
                  <span class="inpt-text">处理结果：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">处理人：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>

                <el-col :span="6" class="input-item">
                  <span class="inpt-text">审批人：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">审批人：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>
              </el-row>
              <el-row type="flex">
                <el-col :span="6">
                  <span class="inpt-text">处理结果：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">处理人：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>

                <el-col :span="6" class="input-item">
                  <span class="inpt-text">审批人：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">审批人：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>
              </el-row>
              <el-row type="flex">
                <el-col :span="6">
                  <span class="inpt-text">处理结果：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">处理人：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>

                <el-col :span="6" class="input-item">
                  <span class="inpt-text">审批人：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">审批人：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>
              </el-row>
              <el-row type="flex">
                <el-col :span="6">
                  <span class="inpt-text">处理结果：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="6" class="input-item">
                  <span class="inpt-text">处理人：</span>
                  <el-input placeholder="请输入内容" size="small"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="2" class="down-btn-area">
              <el-button type="success" class="mb-15" size="small">查询</el-button>
              <el-button type="primary" plain size="small">重置</el-button>
            </el-col>
          </el-row>

        <!-- <div class="ak-tab-pane" v-show="akCheckId==2">

        </div>
        <div class="ak-tab-pane" v-show="akCheckId==2">

        </div> -->
      </div>
    </div>
    <div class="middle mb-2">

    </div>
    <div class="middle">
      <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          prop="businessEvents"
          label="业务事件类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="creationDate"
          label="创建日期"
          width="160">

        </el-table-column>
        <el-table-column
          prop="theName"
          label="姓名"
          width="130">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="birthDate"
          label="出生日期">
        </el-table-column>
        <el-table-column
          prop="nationality"
          label="国籍">
        </el-table-column>
        <el-table-column
          prop="id"
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="identify"
          label="出入标识">
        </el-table-column>
        <el-table-column
          prop="flightNo"
          label="航班号">
        </el-table-column>
        <el-table-column
          prop="flightDate"
          label="航班日期">
        </el-table-column>
        <el-table-column
          prop="eventNumber"
          label="业务事件编号"
          width="130">
        </el-table-column>
        <el-table-column
          prop="stateFeedback"
          label="反馈状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button class="table-btn" size="mini" plain @click="detailsDialogVisible=true">详情</el-button>
         </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="详情"
      :visible.sync="detailsDialogVisible"
      width="600px"
      >
      <div class="add-dialog">
        <ul class="nameUi">
          <li>口岸:</li>
          <li>航班号:</li>
          <li>航班日期:</li>
          <li>出入标识:</li>
          <li>事件类型:</li>
          <li>处理结果:</li>
          <li>处理内容:</li>
        </ul>
        <ul class="dataUi">
          <li>北京</li>
          <li>CH123456</li>
          <li>20180303</li>
          <li>入境</li>
          <li>报警事件</li>
          <li>已处理</li>
          <li>同意解除黑名单</li>
        </ul>
        <div style="clear:both">

        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="detailsDialogVisible = false" size="small" style="background-color:#f7f7f7">取消</el-button>
      </span>
    </el-dialog>
  </div>



</template>

<script>
export default {
  data(){
    return{
      akCheckId:1,
      checkList: ['性别'],
      value:1,
      detailsDialogVisible:false,
      value1:'',
      value2:'',
      value3:'',
      value6:'',
      tableData: [
        {
          "businessEvents": "ba754edc095a45b5b73",
    			"creationDate": "1",
    			"theName": 1514563200000,
    			"gender": "男",
    			"birthDate": "1",
    			"nationality": 1,
    			"id": "1",
          "identify": "1",
			    "flightNo": "1",
          "flightDate":"1",
          "eventNumber":"1",
          "stateFeedback":"1",
        }
      ],
      pickerOptions0: {
          disabledDate: (time) => {
              if (this.value3 != "") {
                  return time.getTime() > Date.now() || time.getTime() > this.value3;
              } else {
                  return time.getTime() > Date.now();
              }

          }
      },
      pickerOptions1: {
          disabledDate: (time) => {
              return time.getTime() < this.value2 || time.getTime() > Date.now();
          }
      },
      gridData:[{

      }],
      multipleSelection:[]
    }
  },
  methods:{
    handleSelectionChange(val) {
       this.multipleSelection = val;
     }
  }
}
</script>

<style scoped>
  .ak-tab{

  }
  .ak-tabs{
    display: flex;

  }
  .ak-tab-item{
    background: #399bfe;
    color: #fff;
    font-size: 14px;
    margin-right: 6px;
    border-radius: 5px 5px 0 0;
    padding: 0 16px;
  }
  .ak-checked{
    background: #fff;
    color: #399bfe;
    border: 1px #399bfe solid;
    border-bottom: 1px #fff solid;
    margin-bottom: -1px;
  }
  .ak-tab-pane{
    border: 1px #399bfe solid;
    height: 148px;
    padding: 20px;
    border-radius: 0 5px 5px 5px;
  }
  .akcheck2top{
    background: #f6f7fb;
    /* height: 28px; */
    padding: 6px;
  }
  .middle-btn-g{
    display: flex;
    justify-content: center;
  }
  .middle-btn-g button{
    height: 32px;
    width:107px;
    border: none;
    border-radius: 5px;
    background: none;
    background: linear-gradient( 360deg, rgb(9,171,236) 0%, rgb(0,121,228) 100%);
    color:#fff;
  }
  .akUl{
    height: 103px;
    overflow-y: auto;
  }
  .akUl img{
    height: 15px;
    width: 21px;
    margin-right: 8px;
  }
  .ak-li{
    height: 58px;
    align-items: center;
    padding: 0 30px;

  }
.nameUi,.dataUi{
  float: left;
  margin-left: 20px;
}
.nameUi li,.dataUi li{
  padding: 5px 10px 10px 0px;
  font-weight: bold;
}
.dataUi{
  float: left;
}
.t-input-item{
  display: flex;
  justify-content: flex-start;
  line-height: 32px;
}
.flightDate{
  width:211px;
  height:32px
}

</style>
<style media="screen">
.t-input-item .flightDate input{
  width: 42%!important;
}
</style>
