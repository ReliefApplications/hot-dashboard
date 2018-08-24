/** Natives **/
import React, { Component } from 'react';

/** Material UI **/
import Button       from '@material-ui/core/Button';
import Menu         from '@material-ui/core/Menu';
import MenuItem     from '@material-ui/core/MenuItem';
// import CloudUploadIcon  from '@material-ui/icons/CloudUpload';

/** Styles **/
const Buttons = {
  background : '#C43636',
  color      : 'white',
  margin     : '0 0 0 10px',
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
      anchorProject              : null,
    }
  }

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


  /** Open content & close mini menu **/
  selectProjectFromMiniMenu = (content) => () => {
    let selectedProject = []; //Object sended to container (Home)

    // // Initialize all content state to false
    // let selectedPageName         = ''
    // let mainContentChanged       = false;
    // let trainingContentChanged   = false;
    // let updateDataContentChanged = false;

    // // Check which button is clicked
    // if     (content === 'global')   { mainContentChanged       = true;   selectedPageName='Global';   }
    // else if(content === 'training') { trainingContentChanged   = true;   selectedPageName='Training'; }
    // else if(content === 'upload')   { updateDataContentChanged = true;   selectedPageName='Upload';   }

    // // Push new item to the array to send
    // selectedProject.push({
    //   pageName        : selectedPageName,
    //   mainContent     : mainContentChanged,
    //   trainingContent : trainingContentChanged,
    //   updateContent   : updateDataContentChanged
    // })

    // Close the mini menu
    this.setState({ anchorProject: null });

    // Sending the array
    // this.props.sendToHome(selectedProject)
  };



  render() {
    const { anchorProject } = this.state;

    var projectsList = this.props.importedProjects.map((item) => {
      return (
          <MenuItem key={item.projectname} onClick={this.selectProjectFromMiniMenu(item.projectname)}> {item.projectname[0].toUpperCase() + item.projectname.substring(1)} </MenuItem>
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

            {/*/!* Update Data button *!/*/}
            {/*<Button style     = {Buttons}*/}
                    {/*variant   = "contained"*/}
                    {/*component = "span">*/}
              {/*Upload*/}
              {/*<CloudUploadIcon className="update-data-button-icon"/>*/}
            {/*</Button>*/}

            {/* Title */}
            <h1 className="header-title">HOT Overview - {this.props.pageName}</h1>

          </header>
        </div>
    );
  }
}

export default Header;