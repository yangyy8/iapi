// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default{
  install (Vue, options) {
    Vue.prototype.getPdf = function (type) {
      // var title = this.htmlTitle
      // var w = document.querySelector('#printMe').clientWidth;    // 获得该容器的宽
      // var h = document.querySelector('#printMe').clientHeight;    // 获得该容器的高
      // var canvas = document.createElement("canvas");
      // var scale = 2
      // canvas.width = w * scale;    // 将画布宽&&高放大两倍
      // canvas.height = h * scale;
      // canvas.getContext("2d").scale(scale, scale);
    //   var opts = {
    //     scale: scale, // 添加的scale 参数
    //     canvas: canvas, //自定义 canvas
    //     // logging: true, //日志开关，便于查看html2canvas的内部执行流程
    //     width: width, //dom 原始宽度
    //     height: height,
    //     useCORS: true // 【重要】开启跨域配置
    // };
      html2Canvas(document.querySelector('#printMe'), {
        allowTaint: true
      }).then(function (canvas) {
        // var context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        // context.mozImageSmoothingEnabled = false;
        // context.webkitImageSmoothingEnabled = false;
        // context.msImageSmoothingEnabled = false;
        // context.imageSmoothingEnabled = false;
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let imgWidth = 592.28
        let pageHeight = contentWidth / imgWidth * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgHeight = imgWidth / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 20, 25, imgWidth-40, imgHeight-50)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        if(type==0){
          var string = PDF.output('datauristring');
          var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
          var x = window.open();
          console.log(x)
          x.document.open();
          x.document.write(iframe);
          x.document.close();
        }else if(type==1){
          PDF.save(title + '.pdf')
        }
      }
      )
    }
  }
}
