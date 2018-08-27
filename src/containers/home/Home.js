/** Natives **/
import React from 'react';

/** Containers **/
import Header             from '../../components/header/Header'
import FilterTabs         from '../../components/filter/Filter'
import MainContentGlobal        from '../../components/content/global/MainContent'
import CapacityBuildingContentGlobal from '../../components/content/global/CapacityBuildingContent'
import AwarenessContentGlobal from '../../components/content/global/AwarenessContent'

/** CSS **/
import './Home.css';

/** Services **/
import PreProcessor   from '../../core/preprocessor/PreProcessor';

/** Material **/
import Divider         from '@material-ui/core/Divider';

const preProcessingService  = new PreProcessor();


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.selectProjectFromHeader     = this.selectProjectFromHeader.bind(this);
    this.selectContentFromFilterTabs = this.selectContentFromFilterTabs.bind(this);
    this.state = {
      MainContent               : MainContentGlobal,
      CapacityBuildingContent   : CapacityBuildingContentGlobal,
      AwarenessContent          : AwarenessContentGlobal,
      menuLeft                        : false,    // State of the left menu.
      mainContentSelected             : true,     // When Main Content is selected
      capacityBuildingContentSelected : false,    // When Training Content is selected
      awarenessContentSelected        : false,    // When updateDataSelected Content is selected

      projectName : 'Global', // Name of the actual project
      contentName : 'Main',   // Name of the actual content

      importedProjects    : [],
      importedIndicators : [],
    };
  }

  //------------------------------------------------------------------------//
  //---------------------------------- Init --------------------------------//
  //------------------------------------------------------------------------//

  /** Call all datas file from the GitHub api **/
  async componentDidMount(){
    console.log("process");
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
    });
    console.log('importedProjects   HOME', this.state.importedProjects);
    console.log('importedIndicators HOME', this.state.importedIndicators);
    console.log('projectName HOME',        this.state.projectName);
  }

  //------------------------------------------------------------------------//
  //---------------------- Project & Content display -----------------------//
  //------------------------------------------------------------------------//

  /** Selecting the project from the header button **/
  async selectProjectFromHeader(selectedProjectFromHeader){
    let mainContentImported = await import('../../components/content/'+selectedProjectFromHeader+'/MainContent');
    /** TODO
     * lazy load the content not displayed
     */
    let capacityBuildingContentImported = await import('../../components/content/'+selectedProjectFromHeader+'/CapacityBuildingContent');
    let awarenessContentImported = await import('../../components/content/'+selectedProjectFromHeader+'/AwarenessContent');
    this.setState({
      contentName                     : 'Main',
      mainContentSelected             : true,
      capacityBuildingContentSelected : false,
      awarenessContentSelected        : false,
      projectName                     : selectedProjectFromHeader,
      MainContent                     : mainContentImported.default,
      CapacityBuildingContent         : capacityBuildingContentImported.default,
      AwarenessContent                : awarenessContentImported.default,
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
          <FilterTabs sendToHome={this.selectContentFromFilterTabs} contentName={this.state.contentName}></FilterTabs>

          {/* Line between filter component & content */}
          <Divider />

          {/* Contents */}
          {mainContentSelected             && (<this.state.MainContent             importedIndicators = {importedIndicators.global} ></this.state.MainContent>)}
          {capacityBuildingContentSelected && (<this.state.CapacityBuildingContent importedIndicators = {importedIndicators.global} ></this.state.CapacityBuildingContent>)}
          {awarenessContentSelected        && (<this.state.AwarenessContent importedIndicators = {importedIndicators.global}></this.state.AwarenessContent>)}
        </div>
    );
  }
}

export default Home;
