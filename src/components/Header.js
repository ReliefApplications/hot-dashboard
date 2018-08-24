/** Natives **/
import React, { Component } from 'react';

/** Material UI **/
import Button       from '@material-ui/core/Button';
import Menu         from '@material-ui/core/Menu';
import MenuItem     from '@material-ui/core/MenuItem';
import Grid             from '@material-ui/core/Grid';


/** Styles **/
const Buttons = {
    background : '#C43636',
    color      : 'white',
    margin     : '0 0 0 5px',
    fontFamily : "'Barlow Condensed', sans-serif",
    fontSize   :  18
};


class Header extends Component {
  constructor(props) {
    super(props)

    this.openMiniMenu              = this.openMiniMenu.bind(this);
    this.closeMiniMenu             = this.closeMiniMenu.bind(this);
    this.selectProjectFromMiniMenu = this.selectProjectFromMiniMenu.bind(this);

    this.state = {
      anchorProject   : null,
      selectedProject : 'Global'
    }
  }

  //------------------------------------------------------------------------//
  //------------------------------- General --------------------------------//
  //------------------------------------------------------------------------//

  /** Set the first letter of a string to uppercase **/
  upperCaseFirstChar(string){
    return string[0].toUpperCase() + string.substring(1);
  }
  //------------------------------------------------------------------------//
  //------------------------------ Mini Menu -------------------------------//
  //------------------------------------------------------------------------//

  /** Open Mini Menu **/
  openMiniMenu = event => {
    this.setState({
      anchorProject: event.currentTarget
    });
  };

  /** Open Mini Menu **/
  closeMiniMenu = () => {
    this.setState({ anchorProject: null });
  };


  /** Seleting a project in the mini menu **/
  selectProjectFromMiniMenu = (projectName) => () => {

    // Uppercase the first letter of the project name
    let projectNameUppercase = this.upperCaseFirstChar(projectName);

    // Close the mini menu + Change the title with the project selected
    this.setState({
      anchorProject   : null,
      selectedProject : projectNameUppercase
    });

    //Sending the project
    this.props.sendToHome(projectNameUppercase)
   };

   //------------------------------------------------------------------------//
   //-------------------------------- Render --------------------------------//
   //------------------------------------------------------------------------//

  render() {
    const { anchorProject } = this.state;

    var projectsList = this.props.importedProjects.map((item) => {
      return (
        <MenuItem key={item.projectname} onClick={this.selectProjectFromMiniMenu(item.projectname)}> {this.upperCaseFirstChar(item.projectname)} </MenuItem>
      );
    });

    return (
      <div className="header-component">

          <header className="header">

              {/* 'Project' button */}
              <Button style     = {Buttons}
                      aria-owns = {anchorProject ? 'MiniMenuGlobal' : null}
                      variant   = "contained"
                      component = "span"
                      onClick   = {this.openMiniMenu}>
                Projects
              </Button>
              <Menu id       = "MiniMenuGlobal"
                    anchorEl = {anchorProject}
                    open     = {Boolean(anchorProject)}
                    onClose  = {this.closeMiniMenu}
              >
                {projectsList}
              </Menu>

              {/* Title */}
              <h2 className="header-title">{this.state.selectedProject} Overview - {this.props.contentName}</h2>
        </header>
      </div>
    );
  }
}

export default Header;
