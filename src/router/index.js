import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/content',
      name: 'Content',
      component: resolve => require(['@/components/content'], resolve),

      children: [
        // 业务处理=================================================================================================================================

        // 报警处理---------------------------------------------------------------------------------------------------
        //名单报警处理---------------------------------------------------------------------------------------------------
        {
          path: "ProcessMDBJ",
          name: "ProcessMDBJ",
          component: resolve => require(['@/components/BusinessProcessing/Alarm/ProcessMDBJ'], resolve),

        },
        {
          path: "alarmProcess",
          name: "alarmProcess",
          component: resolve => require(['@/components/BusinessProcessing/Alarm/alarmProcess'], resolve),
        },
        {
          path: "infoComparison",
          name: "infoComparison",
          component: resolve => require(['@/components/BusinessProcessing/Alarm/infoComparison'], resolve),
        },

        //二次查控报警
        {
          path: "ProcessECBDBJ",
          name: "ProcessECBDBJ",
          component: resolve => require(['@/components/BusinessProcessing/Alarm/ProcessECBDBJ'], resolve),
        },
        //重点关注人员预报警
        {
          path: "ProcessZDGZRY",
          name: "ProcessZDGZRY",
          component: resolve => require(['@/components/BusinessProcessing/Alarm/ProcessZDGZRY'], resolve),
        },
        //常规业务处理-------------------------------------------------------------------------------
        //指令变更
        {
          path: "ProcessZLBG",
          name: "ProcessZLBG",
          component: resolve => require(['@/components/BusinessProcessing/ZLBG/ProcessZLBG'], resolve),
        },
        //备降航班处理-------------------------------------------------------------------------------
        //航班状态变更
        {
          path: "ProcessHBZT",
          name: "ProcessHBZT",
          component: resolve => require(['@/components/BusinessProcessing/BJHB/ProcessHBZT'], resolve),
        },

        // 业务应用===================================================================================================================================
        // 信息查询---------------------------------------------------------------------------------------------------
        //人员信息查询
        {
          path: "QueryRYXX",
          name: "QueryRYXX",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryRYXX'], resolve),

        },
        // 业务事件查询---------------------------------------------------------------------------------------------------
        {
          path: "QueryYWSJ",
          name: "QueryYWSJ",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryYWSJ'], resolve),

        },
        // 航班信息查询---------------------------------------------------------------------------------------------------
        {
          path: "QueryHBXX",
          name: "QueryHBXX",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryHBXX'], resolve),

        },
        // 命中人员查询---------------------------------------------------------------------------------------------------
        {
          path: "QueryMZRY",
          name: "QueryMZRY",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryMZRY'], resolve),

        },

        // 关联人员查询---------------------------------------------------------------------------------------------------
        {
          path: "QueryGLRY",
          name: "QueryGLRY",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryGLRY'], resolve),

        },

        // 业务规则查询---------------------------------------------------------------------------------------------------
        {
          path: "QueryYWGZ",
          name: "QueryYWGZ",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryYWGZ'], resolve),

        },
        // 校验比对结果查询---------------------------------------------------------------------------------------------------
        {
          path: "QueryJYBDJG",
          name: "QueryJYBDJG",
          component: resolve => require(['@/components/BusinessApplications/InformationInquiry/QueryJYBDJG'], resolve),

        },


        // 业务管理===================================================================================================================================
        //名单管理-------------
        // 名单数据分析------------------------------------------------------------------------------------------------
        {
          path: "ListMDSJFX",
          name: "ListMDSJFX",
          component: resolve => require(['@/components/BusinessManagement/List/ListMDSJFX'], resolve),

        },
        // 白名单管理--------------------------------------------------------------------------------------------------
        {
          path: "ListBMD",
          name: "ListBMD",
          component: resolve => require(['@/components/BusinessManagement/List/ListBMD'], resolve),

        },
        // 临控名单管理------------------------------------------------------------------------------------------------
        {
          path: "ListLKMD",
          name: "ListLKMD",
          component: resolve => require(['@/components/BusinessManagement/List/ListLKMD'], resolve),

        },
        // 重点关注名单管理-----------------------------------------------------------------------------------------------
        {
          path: "LIstZDGZRYMD",
          name: "LIstZDGZRYMD",
          component: resolve => require(['@/components/BusinessManagement/List/LIstZDGZRYMD'], resolve),

        },
        //业务规则管理
        //数据项校验规则管理
        {
          path: "ListSJXJYGZ",
          name: "ListSJXJYGZ",
          component: resolve => require(['@/components/BusinessManagement/Rule/ListSJXJYGZ'], resolve),

        },
        //一般性规则管理
        {
          path: "ListYBXGZ",
          name: "ListYBXGZ",
          component: resolve => require(['@/components/BusinessManagement/Rule/ListYBXGZ'], resolve),

        },
        //免签规则管理
        {
          path: "ListMQGZ",
          name: "ListMQGZ",
          component: resolve => require(['@/components/BusinessManagement/Rule/ListMQGZ'], resolve),

        },


        //全国监控
        //全国航班实时监控
        {
          path: "NationalHBSSJK",
          name: "NationalHBSSJK",
          component: resolve => require(['@/components/BusinessMonitor/National/NationalHBSSJK'], resolve),

        },


        //系统管理========================
        //机构管理------------------
        //部门管理
        {
          path: "ManageBM",
          name: "ManageBM",
          component: resolve => require(['@/components/SystemManage/Institutional/ManageBM'], resolve),

        },
        //用户管理
        {
          path: "ManageYH",
          name: "ManageYH",
          component: resolve => require(['@/components/SystemManage/Institutional/ManageYH'], resolve),

        },
        //角色管理
        {
          path: "ManageJS",
          name: "ManageJS",
          component: resolve => require(['@/components/SystemManage/Institutional/ManageJS'], resolve),

        },
        //权限管理------------------

        //用户管理
        {
          path: "ManageJZYH",
          name: "ManageJZYH",
          component: resolve => require(['@/components/SystemManage/Permission/ManageJZYH'], resolve),

        },
        //用户认证与登录
        {
          path: "ManageDL",
          name: "ManageDL",
          component: resolve => require(['@/components/SystemManage/Permission/ManageDL'], resolve),

        },
        //系统监控===================
        //运行状态监控-----------
        //服务器监控
        {
          path: "MonitorFWQ",
          name: "MonitorFWQ",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorFWQ'], resolve),

        },
        //数据库监控
        {
          path: "MonitorSJK",
          name: "MonitorSJK",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorSJK'], resolve),

        },
        //应用程序监控
        {
          path: "MonitorYYCX",
          name: "MonitorYYCX",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorYYCX'], resolve),

        },
        //接口服务监控
        {
          path: "MonitorJKFW",
          name: "MonitorJKFW",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorJKFW'], resolve),

        },
        //Redis监控
        {
          path: "MonitorRedis",
          name: "MonitorRedis",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorRedis'], resolve),

        },

        //MQ监控
        {
          path: "MonitorMQ",
          name: "MonitorMQ",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorMQ'], resolve),

        },
        //边界交换平台监控
        {
          path: "MonitorBJJHPT",
          name: "MonitorBJJHPT",
          component: resolve => require(['@/components/SystemMonitor/OperatingStatus/MonitorBJJHPT'], resolve),

        },
        //数据监控----------------------
        //数据一致性监控
        {
          path: "MonitorSJYZX",
          name: "MonitorSJYZX",
          component: resolve => require(['@/components/SystemMonitor/Data/MonitorSJYZX'], resolve),

        },
        //技术网关监控
        {
          path: "MonitorJSWG",
          name: "MonitorJSWG",
          component: resolve => require(['@/components/SystemMonitor/Data/MonitorJSWG'], resolve),

        },
        //整合分发监控
        {
          path: "MonitorZHFF",
          name: "MonitorZHFF",
          component: resolve => require(['@/components/SystemMonitor/Data/MonitorZHFF'], resolve),

        },
        //数据定位
        {
          path: "MonitorSJDW",
          name: "MonitorSJDW",
          component: resolve => require(['@/components/SystemMonitor/Data/MonitorSJDW'], resolve),

        },
        //日志监控------------------
        //日志监控
        {
          path: "MonitorRZJK",
          name: "MonitorRZJK",
          component: resolve => require(['@/components/SystemMonitor/Log/MonitorRZJK'], resolve),

        },
        //性能监控------------------
        //校验比对性能监控
        {
          path: "MonitorJYBDXN",
          name: "MonitorJYBDXN",
          component: resolve => require(['@/components/SystemMonitor/Performance/MonitorJYBDXN'], resolve),

        },
        //整合分发性能监控
        {
          path: "MonitorZHFFXN",
          name: "MonitorZHFFXN",
          component: resolve => require(['@/components/SystemMonitor/Performance/MonitorZHFFXN'], resolve),

        },


      ]
    }
  ]
})
