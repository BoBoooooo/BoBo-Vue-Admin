import axios from 'axios'
import {getToken} from '@/utils/auth'

export default function  (AffixID){

    console.log(AffixID)
    return new Promise((resolve,reject)=>{
        axios.get(`${process.env.BASE_API}file/download`,
        {
            headers:{
                auth:getToken()
            },

            responseType: 'blob', // 表明返回服务器返回的数据类型, 没有会乱码
            
            params: {
                AffixID,
            }
            
            }
        ).then((response)=>{
            let date = new Date();
            let filefix = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            let blob = new Blob([response.data],{

        type: response.headers['Content-Type']
        
        }); //创建一个blob对象
            let a = document.createElement('a'); //创建一个<a></a>标签
            a.href = URL.createObjectURL(blob); // response is a blob
            a.download = filefix + "下载文件.docx";  //文件名称
            a.style.display = 'none';
            document.body.appendChild(a);
            a.click();
            a.remove();

    resolve()
            
        }).catch(e=>{
            reject(e)
        })
    })
}