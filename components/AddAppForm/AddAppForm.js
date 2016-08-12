/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import pubsub from "pubsub-js"
import {Form,FormControl,FormSubmit,Button,Modal,Icon} from "rctui";
import {forjson} from "../AjaxJson"
import s from "./cusstom.css"

class AddAppForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.state.buildlist={};

    this.closeModel.bind(this);
    this.state.appversion=this.props.appversion||[];

    pubsub.subscribe("OPEN_ADD_APP_FORM",(text,data)=>{
      this.setState({modalIsOpen:true});
    })

  }
  closeModel(){
    this.setState({show:false,modalIsOpen:false});
  }
  componentDidMount(){
    this.setState({appversion:this.props.appversion})
  }
  submit(formData){

      this.setState({ formData }) ;

      forjson("http://127.0.0.1:9090/addapp.rest",formData,(data)=>{
        if(data.state==1){
          this.closeModel();
          pubsub.publish("APP_MAIN_RELOAD");
        }
      });
  }



  render() {

    return (
         <div >
           {
             <div>
           <Modal width={700} header="添加App"
                  isOpen={this.state.modalIsOpen}
                  onClose={() => this.setState({ modalIsOpen: false })}
                  buttons={{    '确定': 'submit',    '取消': true   }}>
             <div>
               <Form
                     onSubmit={this.submit.bind(this)}

                 >
                 <FormControl className={s.fix} name="appname" grid={2/8} required={true} label="App名" type="text"/>
                 <FormControl className={s.fix} name="icon" grid={18/24} required={true} label="图标地址" type="text"/>
                 <FormControl grid={{width:18/24}}
                              name="desc"
                              label="描述"
                              autoHeight
                              rows={5}
                              max={100}
                              type="textarea" />

               </Form>
             </div>
           </Modal>

               </div>

           }
          </div>


    )
  }
}

export default AddAppForm;
/*
 onSubmit={
 (formData) => {


 //  data.append("file", file);
 //  let xhr = createCORSRequest('post', "http://127.0.0.1:9090/upload.rest");
 //  xhr.send(data);

 }
 */
