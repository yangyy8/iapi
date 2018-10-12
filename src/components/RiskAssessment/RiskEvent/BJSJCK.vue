<template lang="html">
  <div class="bjsjck">
    <div class="top mb-2">
      事件编号：349082340982342348(客户提供唯一编码业务或方法)
    </div>
    <div class="middle">
      <el-row :gutter="10">
        <el-col :span="3">
          <div class="bjsj-l">
            <img src="../../../assets/img/bp_ap/ph_s.png" alt="" style="width:100%;">
            <span class="mb-2">综合风险等级</span>
            <el-rate v-model="value1" disabled=true class="mb-9"></el-rate>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">电子归档</el-button>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">综合查询</el-button>
            <el-button type="primary" size="small" class="mb-9" style="width:100%">照片比对</el-button>
            <el-button type="success" size="small" style="width:100%">事件归档</el-button>
          </div>
        </el-col>
        <el-col :span="21">
          <div class="ak-tab">
            <div class="ak-tabs">
              <div class="ak-tab-item hand" :class="{'ak-checked':page==0}" @click="page=0">
                风评信息
              </div>
              <div class="ak-tab-item hand" :class="{'ak-checked':page==1}" @click="page=1;">
                核查信息
              </div>
            </div>
          </div>
          <div class="ak-tab-pane" >
            <div class="boder1 pb-10">
              <div class="title-green ">
                预报信息
              </div>
              <el-row class="middle-msg-row" :gutter="4">
                <el-col :span="6">
                  <span>姓名：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>国籍/地区：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>出入类型：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>出发地：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>性别：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>证件类型：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>航班号：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>目的地：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>出生日期：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>证件号码：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>航班日期：</span>
                  张某某
                </el-col>
                <el-col :span="6">
                  <span>报警时间：</span>
                  2018-07-09 13:23:22
                </el-col>

              </el-row>
              <div class="ak-tip">
                注：
                <span class="tag1"></span><span class="mr-30">生效标签</span>
                <span class="tag0"></span>失效标签
              </div>
              <div class="">
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="warning" size="small">标签四</el-tag>
                <el-tag type="info" size="small">标签三</el-tag>
                <el-tag type="info" size="small">标签三</el-tag>
                <el-tag type="info" size="small">标签三</el-tag>
                <el-tag type="info" size="small">标签三</el-tag>
                <el-tag type="info" size="small">标签三</el-tag>
                <el-tag type="info" size="small">标签三</el-tag>
                <el-button type="text" size="small" @click="moreShow=true" v-if="!moreShow">查看更多 ></el-button>
                <el-button type="text" size="small" @click="moreShow=false" v-if="moreShow">收起<</el-button>
              </div>

            </div>
            <div class="boder1 pb-10">
              <div class="title-green hand mt-10" @click="box1=!box1">
                标签详细信息 <i class="el-icon-d-caret"></i>
              </div>
              <div v-if="box1">
                <div class="">
                  <el-tag type="warning" size="small">维吾尔族人员</el-tag>
                  <div class="">
                    <span>标签描述：</span>外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员外籍畲江重点关注人员
                  </div>
                  <div class="">
                    <span>过程：</span>
                    <div class="">

                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      page:0,
      value1:2,
      moreShow:false,
      box1:true,
    }
  }
}
</script>

<style scoped>
.middle{
  color: #666666;
}
.bjsj-l{
  border: 1px #dddddd solid;
  border-radius: 3px;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.middle-msg-row span{
  display: inline-block;
  width: 85px;
  text-align: right;
}
.ak-tip{
  font-size: 14px;
  color: #999;
}
.tag1{
  display: inline-block;
  width: 16px;
  height: 12px;
  background:rgba(230, 162, 60, 0.9);
  border-radius: 4px;
  margin: 1px;
  vertical-align: middle;
}
.tag0{
  display: inline-block;
  width: 16px;
  height: 12px;
  background:rgba(144, 147, 153, 0.6);
  border-radius: 4px;
  margin: 1px;
  vertical-align: middle;
}
</style>
