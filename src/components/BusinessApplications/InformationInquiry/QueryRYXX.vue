<template lang="html">
  <div class="basicInfo">
    <div class="middle">
      <div class="ak-tab mb-20">
        <div class="ak-tabs">
          <div class="ak-tab-item hand" :class="{'ak-checked':akCheckId==1}" @click="akCheckId=1">
            基础查询
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':akCheckId==2}" @click="akCheckId=2">
            批量查询
          </div>
          <div class="ak-tab-item hand" :class="{'ak-checked':akCheckId==3}" @click="akCheckId=3">
            自定义查询
          </div>
        </div>
        <div class="ak-tab-pane" >
          <el-row type="flex" style="height:100%" v-show="akCheckId==1">
            <el-col :span="22" class="br flex-c">
              <el-row align="center" :gutter="2">
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">国籍：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">证件种类：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">证件号码：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">航班号：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">姓名：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">性别：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">出生日期：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">航班日期：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">起飞机场：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text ">起飞时间：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">到达机场：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">降落时间：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">处理结果：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">处理人：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="2" class="down-btn-area">
              <el-button type="success" class="mb-15" size="small">查询</el-button>
              <el-button type="primary" plain size="small">重置</el-button>
            </el-col>
          </el-row>
          <el-row type="flex" style="height:100%" v-show="akCheckId==2">
            <el-col :span="22" class="bd0">
              <div class="akcheck2top boder1">
                <el-button type="primary" plain size="mini" >批量导入</el-button>
                <el-button type="primary" plain size="mini">下载模板</el-button>
              </div>
              <div class="akUl">
                <el-row type="flex" class="ak-li boder1">
                  <img src="../../../assets/img/hook.png" alt="">

                  <el-col :span="7">
                    <span class="input-text">处理结果：</span>
                    <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                      <el-option>
                      </el-option>
                    </el-select>
                  </el-col>
                  <span class="mr-20">+</span>
                  <el-col :sm="24" :md="12" :lg="6" class="input-item">
                    <span class="input-text">处理人：</span>
                    <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                  </el-col>
                  <el-button type="primary" plain size="mini" >添加</el-button>

                </el-row>
                <el-row type="flex" class="ak-li boder1">
                  <img src="../../../assets/img/hook.png" alt="">

                  <el-col :span="7">
                    <span class="input-text">处理结果：</span>
                    <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                      <el-option>
                      </el-option>
                    </el-select>
                  </el-col>
                  <span class="mr-20">+</span>
                  <el-col :sm="24" :md="12" :lg="6" class="input-item">
                    <span class="input-text">处理人：</span>
                    <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                  </el-col>
                  <el-button type="warning" plain size="mini" >删除</el-button>

                </el-row>
                <el-row type="flex" class="ak-li boder1">
                  <img src="../../../assets/img/hook.png" alt="">

                  <el-col :span="7">
                    <span class="input-text">处理结果：</span>
                    <el-select v-model="value" placeholder="请选择"  size="small">
                      <el-option>
                      </el-option>
                    </el-select>
                  </el-col>
                  <span class="mr-20">+</span>
                  <el-col :sm="24" :md="12" :lg="6" class="input-item">
                    <span class="input-text">处理人：</span>
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
              <el-row align="center" :gutter="2">
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">处理结果：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">处理人：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">审批人：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">审批人：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">处理结果：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">处理人：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">审批人：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">审批人：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">处理结果：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">处理人：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">审批人：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">审批人：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>

                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">处理结果：</span>
                  <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="6" class="input-item">
                  <span class="input-text">处理人：</span>
                  <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="2" class="down-btn-area">
              <el-button type="success" class="mb-15" size="small">查询</el-button>
              <el-button type="primary" plain size="small">重置</el-button>
            </el-col>
          </el-row>
        </div>
        <!-- <div class="ak-tab-pane" v-show="akCheckId==2">

        </div>
        <div class="ak-tab-pane" v-show="akCheckId==2">

        </div> -->
      </div>
      <div class="middle-btn-g">
        <button type="button" name="button" class="mr-15">IAPI数据</button>
        <button type="button" name="button">PNR数据</button>
      </div>

    </div>
    <div class="middle middle-top mb-2">
      <div class="title-green">
        结果显示项
      </div>
      <el-checkbox-group v-model="checkList" class="o-checkbox-g">
       <el-checkbox label="姓名"></el-checkbox>
       <el-checkbox label="性别"></el-checkbox>
       <el-checkbox label="出生日期"></el-checkbox>
       <el-checkbox label="国籍"></el-checkbox>
       <el-checkbox label="证件号码"></el-checkbox>
       <el-checkbox label="航班号"></el-checkbox>
       <el-checkbox label="航班日期"></el-checkbox>
       <el-checkbox label="出入境"></el-checkbox>
       <el-checkbox label="反馈状态"></el-checkbox>
       <el-checkbox label="值机状态"></el-checkbox>
       <el-checkbox label="预计起飞时间"></el-checkbox>
       <el-checkbox label="到达机场"></el-checkbox>
       <el-checkbox label="预计降落时间"></el-checkbox>
       <el-checkbox label="原预检结果"></el-checkbox>
       <el-checkbox label="是否有效"></el-checkbox>
       <el-checkbox label="航空公司联系电话"></el-checkbox>
       <el-checkbox label="其他证件颁发国家"></el-checkbox>
       <el-checkbox label="其他证件签发日期"></el-checkbox>
       <el-checkbox label="签证号码"></el-checkbox>
       <el-checkbox label="签证有效期"></el-checkbox>
       <el-checkbox label="是否报警"></el-checkbox>
       <el-checkbox label="护照有效期"></el-checkbox>
       <el-checkbox label="护照签发日期"></el-checkbox>
       <el-checkbox label="ABO唯一标识"></el-checkbox>
       <el-checkbox label="其他证件号码"></el-checkbox>
       <el-checkbox label="其他证件有效期"></el-checkbox>
       <el-checkbox label="边检回复时间"></el-checkbox>
       <el-checkbox label="航班状态"></el-checkbox>
       <el-checkbox label="护照颁发国家"></el-checkbox>
       <el-checkbox label="旅客状态"></el-checkbox>
     </el-checkbox-group>
    </div>
    <div class="middle">
      <el-button type="primary" plain class="mb-9" size="small">关联人员查询</el-button>
      <!-- <el-table
        ref="multipleTable"
        :data="tableData"
        border
        style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="40"
          >
        </el-table-column>
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
      </el-table> -->
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      akCheckId: 1,
      checkList: ['性别'],
      value: 1,
      tableData: [{
        "eventserial": "ba754edc095a45b5b73",
        "lastmatchtype": "1",
        "flighttype": 1514563200000,
        "numb": 1546099200000,
        "name": "1",
        "nationality": 1,
        "fltno": "1",
        "createtime": "1",
        "saveflag": "1",
      }],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
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

.akcheck2top {
  background: #f6f7fb;
  /* height: 28px; */
  padding: 6px;
}

.middle-btn-g {
  display: flex;
  justify-content: center;
}

.middle-btn-g button {
  height: 32px;
  width: 107px;
  border: none;
  border-radius: 5px;
  background: none;
  background: linear-gradient( 360deg, rgb(9, 171, 236) 0%, rgb(0, 121, 228) 100%);
  color: #fff;
}

.akUl {
  height: 103px;
  overflow-y: auto;
}

.akUl img {
  height: 15px;
  width: 21px;
  margin-right: 8px;
}

.ak-li {
  height: 58px;
  align-items: center;
  padding: 0 30px;

}
</style>
