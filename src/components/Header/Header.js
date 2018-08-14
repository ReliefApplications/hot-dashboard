/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './Header.css';

/** Material UI **/
import IconButton       from '@material-ui/core/IconButton';
import MenuIcon         from '@material-ui/icons/Menu';




class Header extends Component {

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    return (
      <div className="header-component">
        <header className="header">
          <IconButton color="inherit" aria-label="Menu" onClick={this.toggleDrawer('right', true)}>
            <MenuIcon />
          </IconButton>
          <h1 className="header-title">HOT Overview</h1>
        </header>
      </div>
    );
  }
}

export default Header;
