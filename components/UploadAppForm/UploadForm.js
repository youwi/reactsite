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

class UploadForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.state.buildlist={};
    this.createCORSRequest.bind(this);
    this.closeModel.bind(this);
    this.state.appversion=this.props.appversion||[];
    pubsub.subscribe("OPEN_UPLOAD_FORM",()=>{
      this.setState({show:true,modalIsOpen: true });
    });
    pubsub.subscribe("CLOSE_UPLOAD_FORM",()=>{
      this.setState({show:false,modalIsOpen: false });
    });

  }
  closeModel(){
    this.setState({show:false,modalIsOpen:false});
  }
  componentDidMount(){
    this.setState({appversion:this.props.appversion})
  }

  handelSelectAppVersionPlatform(obj,e){

  }
  createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ('withCredentials' in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== 'undefined') {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}



  render() {

    return (
         <div >
           {
             <div>
           <Modal width={700} header="文件上传窗口"
                  isOpen={this.state.modalIsOpen}
                  onClose={() => this.setState({ modalIsOpen: false })}
                  buttons={{    '确定': 'submit',    '取消': true   }}>
             <div>
               <Form
                     onSubmit={(formData) =>{
                     // var oblist=JSON.parse("["+formData.file+"]"); // 多个文件要拼装 根据它的值回返正常

                        formData.rsid=JSON.parse(formData.file).rsid;
                        formData.filerollback=formData.file;
                        delete formData.file;
                        this.setState({ formData }) ;
                        console.log(formData);
                        forjson("http://127.0.0.1:9090/upload.rest",formData,(data)=>{
                            if(data.state==1){
                               pubsub.publish("CLOSE_UPLOAD_FORM");
                               this.closeModel();
                               this.setState({show:false,modalIsOpen:false});
                               console.log(this.state.show);
                               console.log(this.state.modalIsOpen);
                               this.forceUpdate();
                            }

                        });
                        return true;
                     }}


                 >
                 <FormControl className={s.fix} name="appname" grid={2/8} required={true} label="项目名" type="text"/>
                 <FormControl className={s.fix} name="version" grid={2/8} required={true} label="版本" type="integer"/>
                 <FormControl className={s.fix} name="build"   grid={2/8} required={true} label="构建号"  type="integer"/>
                 <FormControl className={s.fix} name="env"     grid={2/8} required={true} label="环境名" type="text"/>
                 <FormControl className={s.fix} name="platform"     grid={2/8} required={true} label="平台" type="text"/>
                 <FormControl className={s.fix} name="revision"     grid={2/8} required={true} label="评审号" type="integer"/>
                 <FormControl name="file"
                              label="上传文件"
                              type="upload"
                              grid={1/2}
                              action="http://10.0.18.47:8101/uploadrsid.rest"
                              accept="*/*"
                              fileSize={300000000}
                              limit={1}
                              content={<Button><Icon icon="upload" />添加文件</Button>} />

               </Form>
             </div>
           </Modal>

               </div>

           }
          </div>


    )
  }
}

export default UploadForm;
/*
 onSubmit={
 (formData) => {


 //  data.append("file", file);
 //  let xhr = createCORSRequest('post', "http://127.0.0.1:9090/upload.rest");
 //  xhr.send(data);

 }
 */
