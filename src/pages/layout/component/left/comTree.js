import React,{useContext} from "react";
import { LayoutContext } from '@/pages/layout';
import { Collapse } from 'antd';
import "./left.css";
const { Panel } = Collapse;

function  ComTree() {
    const {state,dispatch}= useContext(LayoutContext);
    console.log(state)
    const callback = (key)=> {
        console.log(key);
        // dispatch({type:'changeNodeActive',_id:key})
    }
    const changeNodeActive = (_id)=> {
        console.log(999999)
        dispatch({type:'changeNodeActive',_id:_id})
    }
    return (
        <div className={'comTree'}>
           <Collapse defaultActiveKey={state.viewsComList[0]?[state.viewsComList[0]._id]:['1']} onChange={callback}>
                <Panel header="root" key={state.viewsComList[0]?state.viewsComList[0]._id:'1'}>
                    {
                        state.viewsComList.map((item,index) =>
                                <p onClick={(e)=>changeNodeActive(item._id)} key={index} className={`comTree-node ${item.active?'activeNode':''}`}>{item.comType}</p>
                    )}
                </Panel>
           </Collapse>
        </div>
    )
}
export default ComTree;