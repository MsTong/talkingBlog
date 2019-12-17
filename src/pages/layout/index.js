import React, { useState, Context, createContext, useContext, useReducer } from 'react';
import {Button, Layout, Menu, Breadcrumb,Icon} from 'antd';
import { Link } from "react-router-dom";
import { message } from 'antd';
import "./index.css"
import Coms from './component/coms.js';
import ComList from './component/comList.js';
import {Views} from "./component/views.js";
import ComDetails from "./component/comDetails.js";
import ViewSetting from "./component/viewSetting.js";

import {initialState , myreducer } from './store';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
export const LayoutContext = createContext();
export const LayoutPage = (params)=> {
    const [state, dispatch] = useReducer(myreducer, initialState);
    console.log(state);
    const doSaveViews = ()=>{
        alert("保存成功！")
    }
    const doPublish = ()=>{
        alert("发布成功！")
    }
    let ContentMenuItem = null
    if (state.contentType==='views') {
        ContentMenuItem = <Views/>
    } else if(state.contentType==='comDetails') {
        ContentMenuItem = <ComDetails/>
    } else if(state.contentType==='viewSetting') {
        ContentMenuItem = <ViewSetting/>
    }
   
    return (
        <div className="layoutPage">
            <Layout className="layout" style={{ height: '100%'}}>
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px',flex:1 }}
                    >
                        <Menu.Item key="1">布局</Menu.Item>
                        <Menu.Item key="2">部件</Menu.Item>
                        <Menu.Item key="3">撤销</Menu.Item>
                        <Menu.Item key="4">恢复</Menu.Item>
                    </Menu>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1" onClick={doSaveViews}>保存</Menu.Item>
                        <Menu.Item key="2" onClick={doPublish}>发布</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Layout>
                        <Sider width={300}>
                            <Layout>
                                <Header>
                                    <Menu
                                    mode="horizontal"
                                    defaultSelectedKeys={['comList']}
                                    defaultOpenKeys={['sub1']}
                                    style={{ height: '100%', borderRight: '1px solid #e8e8e8'}}
                                    >
                                        <Menu.Item key="comList" onClick={()=>dispatch({type:'setComItem',value:"comList"})}>组件列表</Menu.Item>
                                        <Menu.Item key="coms" onClick={()=>dispatch({type:"setComItem",value:"coms"})}>组合组件</Menu.Item>
                                    </Menu>
                                </Header>
                                <Content>
                                    <LayoutContext.Provider value={{ state, dispatch }}>
                                        {state.comType==='comList' ? <ComList/> : <Coms />}
                                    </LayoutContext.Provider >
                                </Content>
                            </Layout>
                        </Sider>
                        <Content>
                            <Menu
                            mode="horizontal"
                            defaultSelectedKeys={['views']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '48px', borderRight: 0 }}
                            >
                                <Menu.Item key="views" onClick={()=>dispatch({type:"setContentItem",value:"views"})}>场景</Menu.Item>
                                <Menu.Item key="comDetails" onClick={()=>dispatch({type:"setContentItem",value:"comDetails"})}>组件详情</Menu.Item>
                                <Menu.Item key="viewSetting" onClick={()=>dispatch({type:"setContentItem",value:"viewSetting"})}>页面设置</Menu.Item>
                            </Menu>
                            <LayoutContext.Provider value={{ state, dispatch }}>
                                {ContentMenuItem}
                            </LayoutContext.Provider >
                        </Content>
                        <Sider>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%', borderRight: 0 }}
                            >
                            <SubMenu
                                key="sub1"
                                title={
                                <span>
                                    <Icon type="user" />
                                    subnav 1
                                </span>
                                }
                            >
                                <Menu.Item key="1">option1</Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            </Menu>
                        </Sider>
                    </Layout>
                    
                </Content>
            </Layout>,
        </div>
    )
    
}
// export default LayoutPage;
