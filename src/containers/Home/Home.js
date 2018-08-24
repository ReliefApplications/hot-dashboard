/** Natives **/
import React from 'react';

/** Containers **/
import Header                  from '../../components/Header'
import FilterTabs              from '../../components/FilterTabs'
import MainContent             from '../../components/Content/MainContent'
import CapacityBuildingContent from '../../components/Content/CapacityBuildingContent'
import AwarenessContent        from '../../components/Content/AwarenessContent'

/** CSS **/
import './Home.css';

/** Material **/
import Divider from '@material-ui/core/Divider';

/** Services **/
import PreProcessingService  from '../../services/PreProcessingService';

const preProcessingService  = new PreProcessingService();


class Home extends React.Component {
  constructor(props) {
    super(props)
    this.selectProjectFromHeader     = this.selectProjectFromHeader.bind(this);
    this.selectContentFromFilterTabs = this.selectContentFromFilterTabs.bind(this);

    this.state = {
      menuLeft                        : false,    // State of the left menu.
      mainContentSelected             : true,     // When Main Content is selected
      capacityBuildingContentSelected : false,    // When Training Content is selected
      awarenessContentSelected        : false,    // When updateDataSelected Content is selected

      projectName : 'Global', // Name of the actual project
      contentName : 'Main',   // Name of the actual content

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
    let dataFromAPI     = {};

    //  1. Get the projects
    try {
      projectsFromAPI = await preProcessingService.getProjectsFromAPI();
    } catch (e) {
      console.log('preProcessing projects error', e)
    }

    // 2. Get the indicators
    try {
      for(let i=0; i<projectsFromAPI.length; i++){
        dataFromAPI[projectsFromAPI[i].projectname] = await preProcessingService.getDataFromProjects(projectsFromAPI, i);
      }
    } catch (e) {
      console.log('preProcessing data error', e)
    }

    // 3. Set the states received
    this.setState({
      importedProjects   : projectsFromAPI,
      importedIndicators : dataFromAPI
    })
    console.log("importedProjects   HOME", this.state.importedProjects)
    console.log('importedIndicators HOME', this.state.importedIndicators)
    console.log('projectName HOME',        this.state.projectName)

  }


  //------------------------------------------------------------------------//
  //---------------------- Project & Content display -----------------------//
  //------------------------------------------------------------------------//

  /** Selecting the project from the header button **/
  selectProjectFromHeader(selectedProjectFromHeader){

    this.setState({
      projectName : selectedProjectFromHeader
    });
  }

  /** Selecting the new content chosen in the filter tabs component **/
  selectContentFromFilterTabs(selectedContent){
    this.setState({
      contentName                     : selectedContent[0].contentName,
      mainContentSelected             : selectedContent[0].mainContent,
      capacityBuildingContentSelected : selectedContent[0].capacityBuildingContent,
      awarenessContentSelected        : selectedContent[0].awarenessContent
    });
  }


  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    const { mainContentSelected }             = this.state;
    const { capacityBuildingContentSelected } = this.state;
    const { awarenessContentSelected }        = this.state;
    const { importedIndicators }              = this.state;


      return (
        <div className="Home">

        {/* Header */}
          <Header sendToHome={this.selectProjectFromHeader} contentName={this.state.contentName} importedProjects={this.state.importedProjects}></Header>

        {/* Filter Tabs */}
          <FilterTabs sendToHome={this.selectContentFromFilterTabs}></FilterTabs>

        {/* Line between filter component & content */}
          <Divider />

        {/* Contents */}
          {mainContentSelected             && (<MainContent             importedIndicators = {importedIndicators.global}></MainContent>)}
          {capacityBuildingContentSelected && (<CapacityBuildingContent importedIndicators = {importedIndicators.global}></CapacityBuildingContent>)}
          {awarenessContentSelected        && (<AwarenessContent></AwarenessContent>)}
        </div>
      );
    }
  }

export default Home;
