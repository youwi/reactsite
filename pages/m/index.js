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
import Layout from '../../components/Layout';

import AppMainPanel from '../../components/AppMainPanel/AppMainPanel'
import { connect } from 'react-redux';
import LoginDialog from "../../components/LoginDialog";
import { Provider } from 'react-redux';
import Store from "../../core/store.js";
import {App} from "../../components/TodoApp/TodoApp";
import GlobalToast from "../../components/GlobalToast";
import UploadForm from "../../components/UploadAppForm";
import AddAppForm from  "../../components/AddAppForm";

import ItemServices from "../../components/ItemServices"

class MPage extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
        <ItemServices title="">
          说明
        </ItemServices>

    );
  }

}

//export default connect(select)(HomePage);
export default MPage;
