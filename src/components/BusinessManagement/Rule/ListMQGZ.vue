<template lang="html">
  <div class="visaRules">
    <el-row class="mb-15" type="flex" style="height:100%">
      <!-- 证件规则-->
      <el-col :span="8">
        <div class="middle mb-2">
          <!-- 证件规则标题 -->
          <el-row>
            <div class="title-green t-flex t-bb">
              <div>证件规则</div>
              <div>
                <span class="t-active">{{inactive}}</span>
                <el-switch
                  v-model="cardSearch"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="true"
                  inactive-value="false"
                  @change="cardState">
                </el-switch>
              </div>
            </div>
          </el-row>
          <div class="t-text" :class="{active:isActive}">注：有效期 ><= 时间（时间以服务器为准）</div>
          <!-- 证件规则搜索框 -->
          <el-row type="flex" align="center" style="width:100%">
            <div class="t-flex">
              <el-col :sm="24" :md="12" :lg="6" class="input-item t-input">
                <el-select placeholder="选择证件" v-model="cardList.card" filterable @visible-change="" @change="" size="mini" :disabled="isActive">
                  <el-option label="男" value="M"></el-option>
                  <el-option label="女" value="F"></el-option>
                  <el-option label="未知" value="U"></el-option>
                  <!-- <el-option
                    v-for="item in selfNature"
                    :key="item.name"
                    :value="item.name"
                    :label="item.name"
                  ></el-option> -->
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="4" class="input-item t-input-operator">
                <el-select placeholder="请选择" v-model="cardList.operator" filterable  size="mini" :disabled="isActive">
                  <el-option label="男" value="M"></el-option>
                  <el-option label="女" value="F"></el-option>
                  <el-option label="未知" value="U"></el-option>
                  <!-- <el-option
                    v-for="item in operator"
                    :key="item"
                    :value="item"
                    :label="item"
                  ></el-option> -->
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="4" class="input-item t-input">
                <el-select placeholder="时间选择" v-model="cardList.time" filterable  size="mini" :disabled="isActive">
                  <el-option label="男" value="M"></el-option>
                  <el-option label="女" value="F"></el-option>
                  <el-option label="未知" value="U"></el-option>
                </el-select>
              </el-col>
              <el-col :sm="24" :md="12" :lg="3" class="selfButton">
                <el-button type="primary" size="mini" @click="addList" :disabled="isActive">添加</el-button>
              </el-col>
            </div>
          </el-row>
          <!-- 卡片 -->
          <el-row style="position:relative">
            <div class="card-disabled" v-show="isActive"></div>
            <el-card class="box-card t-card">
              <div slot="header" class="clearfix">
                <span>已加入</span>
              </div>
              <div v-for="i in listText" class="t-list">
                <span>{{i}}</span>
                <el-button icon="el-icon-delete" style="border:none" @click="deleteList(i)"></el-button>
              </div>
            </el-card>
          </el-row>
          <!--证件规则 登机牌 -->
          <el-row>
            <el-select placeholder="登机牌" v-model="pass" filterable  size="mini" class="t-width100" :disabled="isActive">
              <el-option label="男" value="M"></el-option>
              <el-option label="女" value="F"></el-option>
              <el-option label="未知" value="U"></el-option>
            </el-select>
            <el-input type="textarea" class="t-width100" placeholder="请输入描述" autosize :disabled="isActive"></el-input>
          </el-row>
        </div>
      </el-col>
      <!-- 国家 -->
      <el-col :span="8">
        <div class="middle mb-2">
          <!-- 国家标题 -->
          <el-row>
            <div class="title-green t-flex t-bb">
              <div>国家</div>
              <div>
                <span class="t-active">{{countryInactive}}</span>
                <el-switch
                  v-model="countrySearch"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="true"
                  inactive-value="false"
                  @change="state">
                </el-switch>
              </div>

            </div>
          </el-row>
          <!-- <div class="" style="position:relative"> -->

            <div class="t-text" :class="{active:countryIsActive}">注：输入关键字搜索国家并加入</div>
            <!-- 国家搜索框 -->
            <el-row type="flex" align="center" style="width:100%;margin-bottom: 5px;" :gutter="10">

              <div class="t-flex t-width100">
                <el-col :sm="24" :md="12" :lg="20" class="t-width100">
                  <el-select v-model="country" filterable @visible-change="" placeholder="国家搜索"  size="small" class="t-width100" :disabled="countryIsActive">
                    <el-option>
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :sm="24" :md="12" :lg="3" class="selfButton">
                  <el-button type="primary" size="mini" @click="countryAddList" :disabled="countryIsActive">添加</el-button>
                </el-col>
              </div>
            </el-row>
            <!-- 卡片 -->
            <el-row style="position:relative">
              <div class="card-disabled" v-show="countryIsActive"></div>
              <el-card class="box-card t-card">
                <div slot="header" class="clearfix">
                  <span>已加入</span>
                </div>
                <div v-for="i in countryListText" class="t-list">
                  <span>{{i}}</span>
                  <el-button icon="el-icon-delete" style="border:none" @click="countryDeleteList(i)"></el-button>
                </div>
              </el-card>
            </el-row>
            <!--证件规则 登机牌 -->
            <el-row>
              <el-select placeholder="登机牌" v-model="countryPass" filterable  size="mini" class="t-width100" :disabled="countryIsActive">
                <el-option label="男" value="M"></el-option>
                <el-option label="女" value="F"></el-option>
                <el-option label="未知" value="U"></el-option>
              </el-select>
              <el-input type="textarea" class="t-width100" placeholder="请输入描述" autosize :disabled="countryIsActive"></el-input>
            </el-row>
          <!-- </div> -->

        </div>
      </el-col>
      <!-- 入境口岸-->
      <el-col :span="8">
        <div class="middle mb-2">
          <!-- 入境口岸标题 -->
          <el-row>
            <div class="title-green t-flex t-bb">
              <div>入境口岸</div>
              <div>
                <span class="t-active">{{entryInactive}}</span>
                <el-switch
                  v-model="entrySearch"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="true"
                  inactive-value="false"
                  @change="entryState">
                </el-switch>
              </div>
            </div>
          </el-row>
          <div class="t-text" :class="{active:entryIsActive}">注：输入关键字搜索口岸并加入</div>
          <!-- 入境搜索框 -->
          <el-row type="flex" align="center" style="width:100%;margin-bottom: 5px;" :gutter="10">

            <div class="t-flex t-width100">
              <el-col :sm="24" :md="12" :lg="20" class="t-width100">
                <el-select v-model="entry" filterable @visible-change="" placeholder="国家搜索"  size="small" class="t-width100" :disabled="entryIsActive">
                  <el-option>
                  </el-option>
                </el-select>
                <!-- <el-autocomplete
                  v-model="entry"
                  class="t-width100"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入内容"
                  size="mini"
                  @select="handleSelect"
                ></el-autocomplete> -->
              </el-col>
              <el-col :sm="24" :md="12" :lg="3" class="selfButton">
                <el-button type="primary" size="mini" @click="entryAddList" :disabled="countryIsActive">添加</el-button>
              </el-col>
            </div>
          </el-row>
          <!-- 卡片 -->
          <el-row style="position:relative">
            <div class="card-disabled" v-show="entryIsActive"></div>
            <el-card class="box-card t-card">
              <div slot="header" class="clearfix">
                <span>已加入</span>
              </div>
              <div v-for="i in entryListText" class="t-list">
                <span>{{i}}</span>
                <el-button icon="el-icon-delete" style="border:none" @click="entryDeleteList(i)"></el-button>
              </div>
            </el-card>
          </el-row>
          <!--证件规则 登机牌 -->
          <el-row>
            <el-select placeholder="登机牌" v-model="entryPass" filterable  size="mini" class="t-width100" :disabled="entryIsActive">
              <el-option label="男" value="M"></el-option>
              <el-option label="女" value="F"></el-option>
              <el-option label="未知" value="U"></el-option>
            </el-select>
            <el-input type="textarea" class="t-width100" placeholder="请输入描述" autosize :disabled="entryIsActive"></el-input>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-alert
    title="警告提示的文案"
    type="warning"
    show-icon
    v-show="aaa">
  </el-alert>
  </div>





</template>

<script>
export default {
  data(){
    return{
      countrySearch: 'true',
      cardSearch:'true',
      entrySearch:'true',
      cardList:{},
      country:"",
      entry:"",
      listText:[],
      countryListText:[],
      entryListText:[],
      pass:'',
      countryPass:'',//登机牌
      entryPass:'',
      value:"0",
      isActive:false,
      countryIsActive:false,
      entryIsActive:false,

      inactive:'启用',
      countryInactive:'启用',
      entryInactive:'启用',
      aaa:false
    }
  },
  methods:{
    addList(){
      if(this.cardList == {}){
        // this.$message({
        //   message: '请填写完整信息！',
        //   type: 'warning'
        // });
        this.aaa=true;
      }
      let str = "";
      str = this.cardList.card+this.cardList.operator+this.cardList.time;
      this.listText.push(str);
    },
    deleteList(item){
      let card = this.listText.indexOf(item);
      this.listText.splice(card,1);
    },
    countryAddList(){
      let countryStr = "";
      countryStr = this.country;
      this.countryListText.push(countryStr);
    },
    countryDeleteList(it){
      let country = this.countryListText.indexOf(it);
      this.countryListText.splice(country,1);
    },
    entryAddList(){
      let entryStr = "";
      entryStr = this.entry;
      this.entryListText.push(entryStr);
    },
    entryDeleteList(it){
      let entry = this.entryListText.indexOf(it);
      this.entryListText.splice(entry,1);
    },
    state(){
      if(this.countrySearch == 'true'){
        this.countryInactive = "启用";
        this.countryIsActive = false;
      }else if(this.countrySearch == 'false'){
        this.countryInactive = "禁用";
        this.countryIsActive = true;
      }
    },
    cardState(){
      if(this.cardSearch == 'true'){
        this.inactive = "启用";
        this.isActive = false;
      }else if(this.cardSearch == 'false'){
        this.inactive = "禁用";
        this.isActive = true;
      }
    },
    entryState(){
      if(this.entrySearch == 'true'){
        this.entryInactive = "启用";
        this.entryIsActive = false;
      }else if(this.entrySearch == 'false'){
        this.entryInactive = "禁用";
        this.entryIsActive = true;
      }
    }
  }
}
</script>

<style scoped>

</style>
<style media="screen">
.t-flex{
  display: flex;
  justify-content: space-between;
}
.t-bb{
  border-bottom: 1px solid #ccc;
}
.tooltip{
  margin-top: 6px;
}
.t-input{
  width: 30%!important;
}
.t-input-operator{
  width: 22%!important;
}
.t-text{
  font-size: 12px;
  color: #F7B74E;
}
.el-card__header{
  padding: 2px 0px 2px 20px!important;
}
.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
  box-shadow: 0 0px 0px 0 rgba(0,0,0,0);
}
.t-list{
  border-bottom: 1px solid #ccc;
  padding: 5px 0px 5px 20px;
  display: flex;
  justify-content: space-between;
}
.el-card__body{
  padding: 0!important;
}
.t-card{
  height: 400px;
}
.t-width100{
  width: 100%;
}
.t-active{
  color: #000;
  font-weight: normal;
  font-size: 13px;
}
.active{
  color: #ccc;
}
.card-disabled{
  position:absolute;
  width:100%;
  height:100%;
  z-index:999;
  background:rgba(245,247,250,0.7)
}
</style>
