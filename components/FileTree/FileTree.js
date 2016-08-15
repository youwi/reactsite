/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import history from '../../core/history';
import {Tree,Icon,Checkbox,Grid,FormItem } from "rctui"


class FileTree extends React.Component {

  constructor(props){
    super();
    this.state={};
    // Tree.setDefaultIcons([
    //   <Icon style={{color: '#f2da81'}} icon="folder-star" />,
    //   <Icon style={{color: '#f2da81'}} icon="folder" />,
    //   <Icon icon="file" />
    // ]);
    window.React=React;
    this.state.data=[
      {
        "id": "account",
        "text": "账户管理",
        "icon": "user",
        "children": [
          {
            "id": "user_list",
            "text": "用户管理",
            "children": [
              {
                "id": "user_edit",
                "text": "编辑"
              }
            ]
          },
          {
            "id": "role_list",
            "text": "角色管理",
            "children": [
              {
                "id": "role_edit",
                "text": "编辑"
              },
              {
                "id": "role_delete",
                "text": "删除"
              }
            ]
          },
          {
            "id": "auth_list",
            "text": "权限管理",
            "children": [
              {
                "id": "auth_edit",
                "text": "编辑"
              },
              {
                "id": "auth_delete",
                "text": "删除"
              }
            ]
          }
        ]
      },
      {
        "id": "sys",
        "text": "系统设置",
        "icon": "cogs",
        "children": [
          {
            "id": "system_log",
            "text": "系统日志"
          },
          {
            "id": "config_list",
            "text": "参数设置",
            "children": [
              {
                "id": "config_edit",
                "text": "编辑"
              },
              {
                "id": "config_delete",
                "text": "删除"
              }
            ]
          }
        ]
      }
    ]

  }
  handleChange(){

  }


  render() {

    return(
      <div>
        <Tree data={this.state.data}
              readOnly={this.state.readOnly}
              selectAble={this.state.selectAble}
              greedy={this.state.greedy}
              icons={
                  this.state.showAccountsIcon ?
                    [
                      <Icon icon="accounts-add" />,
                      <Icon icon="accounts" />,
                      <Icon icon="account" />
                    ]:
                    undefined
                }
              onChange={this.handleChange.bind(this)}
              textTpl="{text}({id})"
              valueTpl="{id}"
              value={this.state.value}
              open={true}
              sep={this.state.sep}
        />
        <div>
          <div><Checkbox onChange={(value)=>this.setState({ selectAble: value })} checked={this.state.selectAble} text="selectAble" /></div>
          <div><Checkbox onChange={(value)=>this.setState({ readOnly: value })} checked={this.state.readOnly} text="readOnly" /></div>
          <div><Checkbox onChange={(value)=>this.setState({ greedy: value })} checked={this.state.gre} text="greedy" /></div>
          <div><Checkbox onChange={(value)=>this.setState({ showAccountsIcon: value })} checked={this.state.showAccountsIcon} text="show accounts icon" /></div>
          {
            ([',', '|', '#', null]).map((sep, i) => {
              return (
                <a key={i} style={{margin: "0 10px"}}
                   onClick={() => { this.setState({ sep }) }}>
                  {JSON.stringify(sep)}
                </a>
              );
            })
          }
        </div>
        <div>value: {this.state.showValue}</div>
        </div>
    )
  }
}

export default FileTree;
