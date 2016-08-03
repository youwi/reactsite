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
import Link from '../Link';

class LoginDialog extends React.Component{
 
  constructor(props){
    super(props);
    this.state = {};
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
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
      <div>
        <Button colored onClick={this.handleOpenDialog} onCancel={this.handleCloseDialog} raised ripple>Show Dialog</Button>
        <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog}>
          <DialogTitle>Allow data collection?</DialogTitle>
          <DialogContent>
            <p>Allowing us to collect data will let us get you the information you want faster.</p>
          </DialogContent>
          <DialogActions>

            <Button type='button' onClick={this.handleCloseDialog}>登陆</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default LoginDialog;
