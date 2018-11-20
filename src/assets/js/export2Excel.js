
import axios from 'axios'
import {format} from '@/assets/js/date.js'
export function download(url,name,data={}){
console.log("---"+data);
  return new  axios({
     method: 'post',
     url: url,
     data: data,
     responseType: 'blob'
     }).then(response => {
         this.downloadM(response,name)
     });

}

downloadM (data,name) {
    if (!data) {
        return
    }
    let url = window.URL.createObjectURL(new Blob([data.data],{type:"application/octet-stream"}))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute(name, format(new Date(),'yyyy-MM-dd hh:mm:ss')+'.xlsx')
    document.body.appendChild(link)
    link.click()
}
