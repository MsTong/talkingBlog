import React,{useContext,useEffect,useState} from "react";
import { Button, Input, message  } from 'antd';
import { LayoutContext } from '@/pages/layout';
import api from "@/api/index.js";
import Clipboard from "clipboard";


function  Coms() {
    const {state,dispathc}= useContext(LayoutContext);
    const {viewsInfo,viewsAction}= useContext(LayoutContext);
    const [copyNum,setCopyNum] = useState(0)
    //保存页面设置修改
    const doSave = async ()=> {
        let data = await api.post("/views/setViewsInfo",{projectId:viewsInfo.projectId,title:viewsInfo.title,viewsKey:viewsInfo.viewsKey})
        if(data.code===0&&data.state===1) {
            message.success('保存修改成功！')
        } else {
            message.warning(data.message)
        }
        return false;
    }
    const setViewsSettingInfo = (key,value)=> {
        viewsAction({type:'setViewsSettingInfo',data:{[key]:value}})
    }
    const getViewsInfo = async ()=>{
        let data = await api.get("/views/getViewsInfo",{projectId:viewsInfo.projectId});
        if(data.code===0&&data.state===1) {
            viewsAction({type:'setViewsSettingInfo',data:{'link':data.data.link,'minlink':data.data.minlink,title:data.data.title,viewsKey:data.data.viewsKey}});
        } else {
            message.warning(data.message)
        }
    }
    const onMouseEnter = ()=> {
        if(copyNum===0) {
            doCopy(viewsInfo.link)
            setCopyNum(1);
            return false;
        } 
    }
    const doCopy = (val)=> {
        let clipboard = new Clipboard(".copy", {
            text: function() {
                return val;
            }
        });
        clipboard.on("success", e => {
            message.success("复制成功"); // 释放内存
            clipboard.destroy();
        });
        clipboard.on("error", e => {
            // 不支持复制
            message.error("不支持自动复制"); // 释放内存
            clipboard.destroy();
        });
    }
    //存储页面信息
    useEffect(()=>{
        //获取页面设置信息
        getViewsInfo();
        
    },[state.contentType])
    return (
        <div className="viewSetting">
            <h5 className="viewSetting-title">发布地址</h5>
            <div className="viewSetting-codeImg">
                <img src={viewsInfo.codeImg}/>
            </div>
            <div className="viewSetting-link">
                <span>链接：</span><a herf={viewsInfo.link} className="viewSetting-link-a">{viewsInfo.link}</a><Button onClick={(e)=>doCopy(viewsInfo.link)} onMouseEnter={onMouseEnter} className="copy">拷贝</Button>
            </div>
            <div className="viewSetting-link">
                <span>短链：</span><a herf={viewsInfo.minlink} className="viewSetting-link-a">{viewsInfo.minlink}</a><Button onClick={(e)=>doCopy(viewsInfo.minlink)} className="copy">拷贝</Button>
            </div>
            <div className="viewSetting-link">
                <span>页面名称：</span>
                <Input value={viewsInfo.title} onChange={(e)=>{setViewsSettingInfo('title',e.target.value)}}/>
            </div>
            <div className="viewSetting-link">
                <span>页面key：</span>
                <Input value={viewsInfo.viewsKey} onChange={(e)=>{setViewsSettingInfo('viewsKey',e.target.value)}}/>
            </div>
            <div className="viewSetting-link">
                <Button onClick={doSave}>保存修改</Button>
            </div>
        </div>
    )
}
export default Coms;