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
import { title, html } from './index.md';
import FileTree from "../../components/FileTree"

class TreePage extends React.Component {



  render() {
    return (
      <Layout>
        <h1>文件树</h1>
        <FileTree></FileTree>
      </Layout>
    );
  }

}

export default TreePage;
