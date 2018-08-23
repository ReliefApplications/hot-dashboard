/** Natives **/
import React, { Component } from 'react';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button          from '@material-ui/core/Button';
import Menu            from '@material-ui/core/Menu';
import MenuItem        from '@material-ui/core/MenuItem';

/** Styles **/
const GlobalTheme = createMuiTheme({
  palette: {
    primary: {
      main : '#D73F3F',
    }
  },
})




class FilterTabs extends Component {
  constructor(props) {
    super(props)

    this.openMiniMenu          = this.openMiniMenu.bind(this);
    this.selectContentMiniMenu = this.selectContentMiniMenu.bind(this);

    this.state = {
      anchorGlobal              : null,

      mainContentSelected       : true,     // When Main Content is selected
      trainingContentSelected   : false,    // When Training Content is selected
      updateDataContentSelected : false,    // When updateDataSelected Content is selected
      pageName                  : 'Global', // Name of the actual page
    }
  }

  /** Open Mini Menu **/
  openMiniMenu = event => {
    this.setState({
      anchorGlobal: event.currentTarget
    });
  };

  /** Open Mini Menu **/
  closeMiniMenu = () => {
    this.setState({ anchorGlobal: null });
  };


  /** Open content & close mini menu **/
  selectContentMiniMenu = (content) => () => {

    let selectedContent = []; //Object sended to container (Home)
    // let anchor = null;

    // Initialize all content state to false
    let selectedPageName         = ''
    let mainContentChanged       = false;
    let trainingContentChanged   = false;
    let updateDataContentChanged = false;

    // Check which button is clicked
    if     (content === 'global')   { mainContentChanged       = true;   selectedPageName='Global';   }
    else if(content === 'training') { trainingContentChanged   = true;   selectedPageName='Training'; }
    else if(content === 'upload')   { updateDataContentChanged = true;   selectedPageName='Upload';   }

    // Push new item to the array to send
    selectedContent.push({
      pageName        : selectedPageName,
      mainContent     : mainContentChanged,
      trainingContent : trainingContentChanged,
      updateContent   : updateDataContentChanged
    })

    // Close the mini menu
    this.setState({ anchorGlobal: null });

    // Sending the array
    this.props.sendToHome(selectedContent)
   };



  render() {
    const { anchorGlobal } = this.state;

    return (
        <div className="tabs">

        {/* Tabs filters */}
        <MuiThemeProvider theme={GlobalTheme}>

            {/* 'Global' button */}
            <Button aria-owns = {anchorGlobal ? 'MiniMenuGlobal' : null}
                    variant   = "contained"
                    component = "span"
                    color     = "primary"
                    onClick   = {this.openMiniMenu}>
              Global
            </Button>
            <Menu id       = "MiniMenuGlobal"
                  anchorEl = {anchorGlobal}
                  open     = {Boolean(anchorGlobal)}
                  onClose  = {this.closeMiniMenu}
            >
              <MenuItem onClick={this.selectContentMiniMenu('global')}  >Global</MenuItem>
              <MenuItem onClick={this.selectContentMiniMenu('training')}>Training</MenuItem>
              <MenuItem onClick={this.selectContentMiniMenu('upload')}  >Upload</MenuItem>
            </Menu>


            {/* 'Project 2' button */}
            <Button aria-owns = {anchorGlobal ? 'MiniMenuGlobal' : null}
                    variant   = "contained"
                    component = "span"
                    color     = "primary"
                    onClick   = {this.openMiniMenu}>
              Project 2
            </Button>

            {/* 'Project 3' button */}
            <Button aria-owns = {anchorGlobal ? 'MiniMenuGlobal' : null}
                    variant   = "contained"
                    component = "span"
                    color     = "primary"
                    onClick   = {this.openMiniMenu}>
              Project 3
            </Button>
        </MuiThemeProvider>

        </div>
    );
  }
}

export default FilterTabs;
