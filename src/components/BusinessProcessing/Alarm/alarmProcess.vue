<template lang="html">
  <div class="alarmProcess">
    <div class="top mb-6">
      <el-row type="flex" class="row-bg">
        事件编号
        <el-input
          placeholder="请输入内容"
          size="small"
          v-model="input1"
          :disabled="true"
          class="apInput">
        </el-input>
      </el-row>

    </div>
    <div class="middle mb-6">
      <div class="middle-tab">
        <div class="middle-tab-item hand" :class="{'middle-checked':tabIsShow==false}" @click="tabIsShow=false">
          基本信息
        </div>
        <div class="middle-tab-item hand" :class="{'middle-checked':tabIsShow==true}" @click="tabIsShow=true">
          事件文档
        </div>
      </div>
      <div class="middle-tab-content" v-show="!tabIsShow">
        <div class="middle-content1">
          <el-row type="flex" >
            <el-col :span="20" class="middle-msg-left">
              <el-row type="flex" class="middle-msg-row">
                <el-col :span="5">
                  <span>姓名</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>性别</span>
                  男

                </el-col>
                <el-col :span="5">
                  <span>出生日期</span>
                  2000年10月10日

                </el-col>
                <el-col :span="5">
                  <span>证件号码</span>
                  M123456

                </el-col>
                <el-col :span="4">
                  <span>国籍</span>
                  张某某

                </el-col>
              </el-row>
              <el-row type="flex" class="middle-msg-row">
                <el-col :span="5">
                  <span>签证号码</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>出入类型</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>第二证号</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>第二国籍</span>
                  张某某

                </el-col>

              </el-row>
              <el-row type="flex" class="middle-msg-row">
                <el-col :span="5">
                  <span>航班号</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>出发地</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>目的地</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>报警时间</span>
                  张某某

                </el-col>

              </el-row>

            </el-col>
            <el-col :span="4" class="middle-msg-right">
              <el-button type="warning" size="small">远程查询</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="middle-content1">
          <div class="title-green">
            甄别信息列表
          </div>
          <el-table
            :data="tableData"
            border
            style="width: 100%;">
            <el-table-column
              prop="date"
              label="档号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="160">
            </el-table-column>
            <el-table-column
              prop="address"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="address"
              label="出生日期">
            </el-table-column>
            <el-table-column
              prop="address"
              label="证件号码">
            </el-table-column>
            <el-table-column
              prop="address"
              label="国籍">
            </el-table-column>
            <el-table-column
              prop="address"
              label="证件种类">
            </el-table-column>
            <el-table-column
              prop="address"
              label="签证号码">
            </el-table-column>
            <el-table-column
              prop="address"
              label="人脸">
            </el-table-column>
            <el-table-column
              prop="address"
              label="指纹">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button  class="table-btn" size="mini" plain @click="$router.push({name:'infoComparison'})">名单甄别</el-button>
             </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="middle-tab-content" v-show="tabIsShow">
        <div class="middle-content1 ">
          <div class="title-green">
            人员信息
          </div>
          <el-row type="flex" >
            <el-col class="middle-msg-img">
              <img src="../../../assets/img/bp_ap/photo.png" alt="">
            </el-col>
            <el-col class="middle-msg-text">
              <el-row type="flex" class="middle-msg-row2">
                <el-col :span="5">
                  <span>姓名</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>性别</span>
                  男

                </el-col>
                <el-col :span="5">
                  <span>出生日期</span>
                  2000年10月10日

                </el-col>
              </el-row>
              <el-row type="flex" class="middle-msg-row2">
                <el-col :span="5">
                  <span>国籍</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>证件号码</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>签证号码</span>
                  张某某

                </el-col>
              </el-row>
              <el-row type="flex" class="middle-msg-row2">
                <el-col :span="5">
                  <span>出入标识</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>第二证号</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>第二国籍</span>
                  张某某

                </el-col>
              </el-row>
              <el-row type="flex" class="middle-msg-row2">
                <el-col :span="5">
                  <span>航班号</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>出发地</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>目的地</span>
                  张某某

                </el-col>
              </el-row>
              <el-row type="flex" class="middle-msg-row2">
                <el-col :span="5">
                  <span>报警类型</span>
                  张某某

                </el-col>
                <el-col :span="5">
                  <span>报警时间</span>
                  张某某

                </el-col>

              </el-row>

            </el-col>

          </el-row>
        </div>
        <div class="middle-content1 ">
          <div class="title-green">
            甄别信息
          </div>
          <el-table
            :data="tableData"
            border
            style="width: 100%;">
            <el-table-column
              prop="date"
              label="档号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="address"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="address"
              label="出生日期">
            </el-table-column>
            <el-table-column
              prop="address"
              label="证件号码">
            </el-table-column>
            <el-table-column
              prop="address"
              label="国籍">
            </el-table-column>
            <el-table-column
              prop="address"
              label="证件种类">
            </el-table-column>
            <el-table-column
              prop="address"
              label="签证号码">
            </el-table-column>
            <el-table-column
              prop="address"
              label="甄别结果">
            </el-table-column>
            <el-table-column
              label="甄别说明">
            </el-table-column>
          </el-table>

        </div>
        <div class="middle-content1 mb-2">
          <div class="title-grey">
            处理结果
          </div>
          <el-row type="flex" class="middle-text-g">
            <el-col :span="4">
              <span>处理结果：</span>
              不做处理
            </el-col>
            <el-col :span="4">
              <span>处理结果：</span>
              不做处理
            </el-col>
            <el-col :span="4">
              <span>处理结果：</span>
              不做处理
            </el-col>

          </el-row>
        </div>
        <div class="middle-content1 middle-btn-g">
          <el-button type="primary" class="mr-22" size="small">打印</el-button>
          <el-button type="success" size="small">导出</el-button>
        </div>
      </div>
    </div>
    <div class="down" v-show="!tabIsShow">
      <div class="title-grey">
        甄别结果
      </div>
      <el-row type="flex" class="mb-15">
        <el-col :span="20">
          <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            placeholder="请输入内容"
            v-model="textarea3">
          </el-input>
        </el-col>
        <el-col :span="4" class="down-btn-area">
          <el-button type="primary" class="mb-15" size="small">确定</el-button>
          <el-button type="warning" size="small">取消</el-button>
        </el-col>
      </el-row>
      <el-row type="flex">
        <el-col :span="6" class="input-item">
          <span >处理结果：</span>
          <el-select v-model="value" placeholder="请选择"  size="small" class="input-input">
            <el-option>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="6" class="input-item">
          <span >处理人：</span>
          <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
        </el-col>
        <el-col :span="6" class="input-item">
          <span >审批人：</span>
          <el-input placeholder="请输入内容" size="small" class="input-input"></el-input>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
   return {
     tabIsShow:false,
     input1: '223333333333',
     tableData: [{
       date: '2016-05-02',
       name: '王小虎',
       address: '上海市'
     }, {
       date: '2016-05-04',
       name: '王小虎',
       address: 'ff'
     }, {
       date: '2016-05-01',
       name: '王小虎',
       address: '上海市普陀区金'
     }, {
       date: '2016-05-03',
       name: '王小虎',
       address: '上海市'
     }],
     textarea3:"",
     value:""
   }
 }
}
</script>

<style scoped>
.apInput{
  width: 330px;

}
.middle{
  background: none;
  padding: 0;
}
.middle-tab{
  width: 252px;
  background:#fff;
  display: flex;

}
.middle-tab-item{
  width: 50%;
  text-align: center;
  background: #a2ddd7;
  color: #4bc3a0;
}
.middle-checked{
  background: #fff;
  border-top: 3px #4bc3a0 solid;
}
.middle-content1{
  background: #fff;
  padding:15px 20px 5px 20px;
}
.middle-msg-left{
  padding-right: 60px;
  border-right: 1px #eee solid;
}
.middle-msg-img{
  width: 130px;
  margin-right: 60px;
}
.middle-msg-row{
  border-bottom: 1px #eee solid;
  color:#666;
  height: 38px;
  line-height: 38px;
}
.middle-msg-row:last-child{
  border: none;
}
.middle-msg-row span{
  display: inline-block;
  width: 80px;
  color: #333;
}
.middle-msg-row2 span{
  display: inline-block;
  width: 75px;
  color: #333;
  font-weight: bold;
}
.middle-msg-right{
  display: flex;
  justify-content: center;
  align-items: center;
}
.middle-text-g span{
  font-weight: bold;
}
.middle-btn-g{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
}


</style>
