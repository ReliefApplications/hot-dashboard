/** Natives **/
import React from 'react';

/** Containers **/
import Header             from '../../components/Header'
import FilterTabs         from '../../components/FilterTabs'
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
import Button          from '@material-ui/core/Button';
import Menu            from '@material-ui/core/Menu';
import MenuItem        from '@material-ui/core/MenuItem';
import PropTypes       from 'prop-types';
import Divider         from '@material-ui/core/Divider';

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

    // Mini Menu
    this.selectContentInPage = this.selectContentInPage.bind(this);


    this.state = {
      menuLeft                  : false,    // State of the left menu.
      mainContentSelected       : true,     // When Main Content is selected
      trainingContentSelected   : false,    // When Training Content is selected
      updateDataContentSelected : false,    // When updateDataSelected Content is selected
      pageName                  : 'Global', // Name of the actual page

      importedProjects    : [],
      importedIndicators  : [],
    }
  }

  //------------------------------------------------------------------------//
  //---------------------------------- Init --------------------------------//
  //------------------------------------------------------------------------//

  /** Call all datas file from the GitHub api **/
  async componentDidMount(){

    let projectsFromAPI = [];
    let dataFromAPI     = [];


    //  1. Get the projects
    try {
      projectsFromAPI = await preProcessingService.getProjectsFromAPI();
    } catch (e) {
      console.log('preProcessing  error', e)
    }

    // 2. Get the indicators
    try {
      dataFromAPI = await preProcessingService.getDataFromProjects(projectsFromAPI);
    } catch (e) {
      console.log('preProcessing  error', e)
    }

    // 3. Set the states received
    this.setState({
      importedProjects   : projectsFromAPI,
      importedIndicators : dataFromAPI
    })
    console.log("importedProjects HOME",   this.state.importedProjects)
    console.log('importedIndicators HOME', this.state.importedIndicators)
  }


  //------------------------------------------------------------------------//
  //----------------------- Mini Menu ( Filter Tabs) -----------------------//
  //------------------------------------------------------------------------//

  /** Select the new content chosen in the filter tabs component **/
  selectContentInPage(selectedContent){
    this.setState({
      anchorGlobal              : null,
      pageName                  : selectedContent[0].pageName,
      mainContentSelected       : selectedContent[0].mainContent,
      trainingContentSelected   : selectedContent[0].trainingContent,
      updateDataContentSelected : selectedContent[0].updateContent
    });
  }


  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    const { classes } = this.props;

      return (
        <div className="Home">

        {/* Header */}
          <Header sendToHome={this.openMenu} pageName={this.state.pageName}></Header>

        {/* Filter Tabs */}
          <FilterTabs sendToHome={this.selectContentInPage}></FilterTabs>
          <Divider />

        {/* Contents */}
          {this.state.mainContentSelected       && (<MainContent     importedIndicators = {this.state.importedIndicators} ></MainContent>)}
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
