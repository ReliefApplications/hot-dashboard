/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './Header.css';

/** Material UI **/
import IconButton       from '@material-ui/core/IconButton';
import MenuIcon         from '@material-ui/icons/Menu';




class Header extends Component {

  //To open the left Menu (on Home.js)
  openLeftMenu = (open) => () => {
    this.props.sendToHeader(open);
  };

  render() {
    return (
      <div className="header-component">
        <header className="header">
          <IconButton color="inherit" aria-label="Menu" >
            <MenuIcon onClick={this.openLeftMenu(true)}/>
          </IconButton>
          <h1 className="header-title">HOT Overview - {this.props.pageName}</h1>
        </header>
      </div>
    );
  }
}

export default Header;
