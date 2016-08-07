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

import {Button,Modal,FormControl  } from "rctui";

class LoginDialog extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.state.openDialog=this.props.openDialog||false;
    console.log("    this.state.openDialog:"+    this.state.openDialog);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);

    this.handleCloseDialog();
  }

  handleOpenDialog(){
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }

  render() {

    return (
      <Modal width={700} header="一个弹出表单"
             isOpen={this.state.modalIsOpen}
             onClose={() => this.setState({ modalIsOpen: false })}
             buttons={{
      '确定': 'submit',
      '取消': true
        }}>
        <div>
          <Form onSubmit={
        (data) => {
          alert(JSON.stringify(data));
          this.setState({ modalIsOpen: false })
        }} layout="aligned">
            <FormControl name="name" grid={7/8} required={true} label="姓名" type="text" />
            <FormControl name="birthday" required={true} label="生日" type="date" />
            <FormControl name="description" grid={7/8} label="简介" type="textarea" rows={6} />
          </Form>
        </div>
        <Button status="primary" onClick={ () => this.setState({ modalIsOpen: true }) }>open form</Button>
      </Modal>

      )
  }
}

export default LoginDialog;
