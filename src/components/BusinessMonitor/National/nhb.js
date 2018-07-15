fn() {
    /*
      图中一共用到三种效果，分别为航线特效图、飞机航线图以及城市图标涟漪图。
      要用到setOption中的series属性，并且对每个城市都要进行三次设置。
  */
  let that = this;
  [
    ['重庆', this.CQData],
    ['广州', this.GZData],
    ['南宁', this.NNData]
  ].forEach(function(item, i) {
    that.series.push({
      // 白色航线特效图
      type: 'lines',
      zlevel: 1, // 用于分层，z-index的效果
      effect: {
        show: true, // 动效是否显示
        period: 6, // 特效动画时间
        trailLength: 0.7, // 特效尾迹的长度
        color: '#fff', // 特效颜色
        symbolSize: 3 // 特效大小
      },
      lineStyle: {
        normal: { // 正常情况下的线条样式
          color: that.color[0],
          width: 0, // 因为是叠加效果，要是有宽度，线条会变粗，白色航线特效不明显
          curveness: -0.2 // 线条曲度
        }
      },
      data: that.convertData(item[1]) // 特效的起始、终点位置
    }, { // 小飞机航线效果
      type: 'lines',
      zlevel: 2,
      //symbol: ['none', 'arrow'],   // 用于设置箭头
      symbolSize: 10,
      effect: {
        show: true,
        period: 6,
        trailLength: 0,
        symbol: that.planePath, // 特效形状，可以用其他svg pathdata路径代替
        symbolSize: 15
      },
      lineStyle: {
        normal: {
          color: that.color[0],
          width: 1,
          opacity: 0.6,
          curveness: -0.2
        }
      },
      data: that.convertData(item[1]) // 特效的起始、终点位置，一个二维数组，相当于coords: convertData(item[1])
    }, { // 散点效果
      type: 'effectScatter',
      coordinateSystem: 'geo', // 表示使用的坐标系为地理坐标系
      zlevel: 3,
      rippleEffect: {
        brushType: 'stroke' // 波纹绘制效果
      },
      label: {
        normal: { // 默认的文本标签显示样式
          show: false,
          position: 'left', // 标签显示的位置
          formatter: '{b}', // 标签内容格式器
          // backgroundColor:'#143652'
        }
      },
      tooltip:{
        formatter: '{b0}: {c0}<br />{b1}: {c1}',
        backgroundColor:'#143652',

      },
      itemStyle: {
        normal: {
          color: '#10fb46'
        }
      },
      data: item[1].map(function(dataItem) {
        return {
          name: dataItem[1].name,
          value: that.geoCoordMap[dataItem[1].name], // 起点的位置
          symbolSize: dataItem[1].value / 8, // 散点的大小，通过之前设置的权重来计算，val的值来自data返回的value
        };
      })
    });
  });

  // 显示终点位置,类似于上面最后一个效果，放在外面写，是为了防止被循环执行多次
  that.series.push({
    type: 'effectScatter',
    coordinateSystem: 'geo',
    zlevel: 3,
    rippleEffect: {
      brushType: 'stroke'
    },
    label: {
      normal: {
        show: true,
        position: 'left',
        formatter: '{b}'
      }
    },
    symbolSize: function(val) {
      return val[2] / 8;
    },
    itemStyle: {
      normal: {
        color: that.color[1]
      }
    },
    hoverAnimation:true,
    
    data: [{
      // 这里面的数据，由于一开始就知道终点位置是什么，所以直接写死，如果通过ajax来获取数据的话，还要进行相应的处理
      name: "重庆",
      value: [107.7539, 30.1904, 30],
      label: {
        normal: {
          position: 'top'
        }
      }
    }, {
      name: '广州',
      value: [113.5107, 23.2196, 30],
      label: {
        normal: {
          position: 'right'
        }
      }
    }, {
      name: '南宁',
      value: [108.479, 23.1152, 30]
    }]
  });
  console.log(that.series)
  this.initChart(that.series)
};
//搜索回调
searchItem(val) {
  console.log(val)
},
//新增回调
addNew(val) {
  console.log(val)
},
//导入
leadingItem(val) {
  console.log(val)
},
// 获取地图中起点和终点的坐标，以数组形式保存下来
convertData(data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i];
    var fromCoord = this.geoCoordMap[dataItem[1].name];
    var toCoord = this.geoCoordMap[dataItem[0].name];
    if (fromCoord && toCoord) {
      res.push([{
        coord: fromCoord // 起点坐标
      }, {
        coord: toCoord // 终点坐标
      }])
    }
  }
  return res;
},
// 重庆
CQData: [
  [{
    name: '重庆'
  }, {
    name: "芬兰",
    value: 30
  }],
  [{
    name: '重庆'
  }, {
    name: "德国",
    value: 90
  }],
  [{
    name: '重庆'
  }, {
    name: "英国",
    value: 30
  }],
  [{
    name: '重庆'
  }, {
    name: "韩国",
    value: 30
  }]
],

// 广州
GZData: [
  [{
    name: '广州'
  }, {
    name: "日本",
    value: 30
  }],
  [{
    name: '广州'
  }, {
    name: "东南亚",
    value: 30
  }]
],

// 南宁
NNData: [
  [{
    name: '南宁'
  }, {
    name: "加拿大",
    value: 30
  }],
  [{
    name: '南宁'
  }, {
    name: "美国",
    value: 100
  }],
  [{
    name: '南宁'
  }, {
    name: "澳大利亚",
    value: 95
  }],
  [{
    name: '南宁'
  }, {
    name: "瑞士",
    value: 30
  }]
],
crType: "0",
title: "图表",
placeholder: "用户名/电话",
