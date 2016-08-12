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
import s from "./cus.css"

class SLabel extends React.Component {

  static propTypes = {

  };

  handleClick = (event) => {

  };

  render() {
    return <span
    className={s.fix}  {...this.props}
    >{this.props.children}</span>
  }

}

export default SLabel;
