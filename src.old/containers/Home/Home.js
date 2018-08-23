/** Natives **/
import React from 'react';

/** Containers **/
import Header             from '../../components/Header'
import MainContent        from '../../components/Content/MainContent'
import TrainingContent    from '../../components/Content/TrainingContent'
import UpdateDataContent  from '../../components/Content/UpdateDataContent'

/** CSS **/
import './Home.css';

/** Services **/
import PreProcessingService   from '../../services/PreProcessingService';

/** Material **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles }  from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List            from '@material-ui/core/List';
import Divider         from '@material-ui/core/Divider';
import Button          from '@material-ui/core/Button';
import PropTypes       from 'prop-types';

const preProcessingService  = new PreProcessingService();

/** Styles **/
const styles = {
  list: {
    width: 200,
  },
};

const GlobalTheme = createMuiTheme({
  palette: {
    primary: {
      main : '#D73F3F',
    }
  },
})

/** Victory doc : https://formidable.com/open-source/victory/docs/victory-chart/ **/

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    this.state = {
      menuLeft                  : false,    // State of the left menu.
      mainContentSelected       : true,     // When Main Content is selected
      trainingContentSelected   : false,    // When Training Content is selected
      updateDataContentSelected : false,    // When updateDataSelected Content is selected
      pageName                  : 'Global', // Name of the actual page

      importedIndicators  : [],
    }
  }

  //------------------------------------------------------------------------//
  //---------------------------------- Init --------------------------------//
  //------------------------------------------------------------------------//

  /** Call all datas file from the GitHub api **/
  async componentDidMount(){

    let preProcessing = [];
    try {
      preProcessing = await preProcessingService.initialize();
    } catch (e) {
      console.log('preProcessing  error', e)
    }


    this.setState({
      importedIndicators : preProcessing
    })
    console.log('importedIndicators HOME', this.state.importedIndicators)
  }




  //------------------------------------------------------------------------//
  //---------------------------------- Menu --------------------------------//
  //------------------------------------------------------------------------//

  /** To open the Menu from the Header child component **/
  openMenu(open){
    this.setState({
      menuLeft: open,
    });
  }

  /** To close the Menu **/
  closeMenu = (close) => () => {
    this.setState({
      menuLeft: close,
    });
  };

  //------------------------------------------------------------------------//
  //-------------------------- Menu/filter Contents ------------------------//
  //------------------------------------------------------------------------//

  /** To show the Main Content **/
  openMainContent = (open) => () => {
    this.setState({
      pageName : 'Global',
      mainContentSelected       : open,
      trainingContentSelected   : false,
      updateDataContentSelected : false
    });
  };

  /** To show the Training Content **/
  openTrainingContent = (open) => () => {
    this.setState({
      pageName : 'Training',
      mainContentSelected       : false,
      trainingContentSelected   : open,
      updateDataContentSelected : false
    });
  };

  /** To show the Update Data Content **/
  openUpdateDataContent = (open) => () => {
    this.setState({
      pageName : 'Update data',
      mainContentSelected       : false,
      trainingContentSelected   : false,
      updateDataContentSelected : open
    });
  };

  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    const { classes } = this.props;

  {/* Items Menu list  */}
    const sideList = (
       <div className={classes.list}>
         <List className="listMenu-item-red"></List>
         <Divider />
         <List className="listMenu-item" onClick = {this.openMainContent(true)}>Main</List>
         <Divider />
         <List className="listMenu-item" onClick = {this.openTrainingContent(true)}>Training</List>
         <Divider />
         <List className="listMenu-item" onClick = {this.openUpdateDataContent(true)}>Update data</List>
       </div>
     );

      return (
        <div className="Home">

        {/* Header */}
          <Header sendToHeader={this.openMenu} pageName={this.state.pageName}></Header>

        {/* Side Menu */}
         <SwipeableDrawer
            anchor  = "left"
            open    = {this.state.menuLeft}
            onClose = {this.closeMenu(false)}
            onOpen  = {this.openMenu}>
            <div
              tabIndex  = {0}
              role      = "button"
              onClick   = {this.closeMenu(false)}
              onKeyDown = {this.closeMenu(false)}>

              {sideList}
            </div>
          </SwipeableDrawer>


          {/* Tabs filters */}
          <MuiThemeProvider theme={GlobalTheme}>
            <div className="tabs">
                {/* 'Gloabal' button */}
                <Button variant="contained" component="span" color="primary" onClick = {this.openMainContent(true)}>
                  Global
                </Button>

                {/* 'Training' button */}
                <Button variant="contained" component="span" color="primary" onClick = {this.openTrainingContent(true)}>
                  Training
                </Button>

                {/* 'Upload' button */}
                <Button variant="contained" component="span" color="primary" onClick = {this.openUpdateDataContent(true)}>
                  Upload
                </Button>
            </div>
          </MuiThemeProvider>

          <Divider />

        {/* Contents */}
          {this.state.mainContentSelected       && (<MainContent     importedIndicators = {this.state.importedIndicators} updageOfData={this.state.importedIndicators}></MainContent>)}
          {this.state.trainingContentSelected   && (<TrainingContent importedIndicators = {this.state.importedIndicators} ></TrainingContent>)}
          {this.state.updateDataContentSelected && (<UpdateDataContent></UpdateDataContent>)}
        </div>
      );
    }
  }


Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
