/** Natives **/
import React from 'react';

/** Containers **/
import Header             from '../../components/header/Header'
import FilterTabs         from '../../components/filter/Filter'
import MainContent        from '../../components/content/global/MainContent'
import CapacityBuildingContent from '../../components/content/global/CapacityBuildingContent'
import AwarenessContent from '../../components/content/global/AwarenessContent'

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
      menuLeft                  : false, // State of the left menu.
      mainContentSelected       : true,  // When Main Content is selected
      trainingContentSelected   : false, // When Training Content is selected
      updateDataContentSelected : false,    // When updateDataSelected Content is selected
      pageName                  : 'Global', // Name of the actual page

      importedProjects    : [],
      importedIndicators : [],
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
    });
    console.log("importedProjects HOME",   this.state.importedProjects)
    console.log('importedIndicators HOME', this.state.importedIndicators)
  }

  //------------------------------------------------------------------------//
  //------------------------ Mini Menu ( Filter Tabs) ---------------------//
  //------------------------------------------------------------------------//

  /** Select the project from the header button **/
  selectProjectFromHeader(selectedProject){
    // this.setState({
    //   anchorGlobal                    : null,
    //   pageName                        : selectedProject[0].pageName,
    //   mainContentSelected             : selectedProject[0].mainContent,
    //   capacityBuildingContentSelected : selectedProject[0].trainingContent,
    //   awarenessContentSelected        : selectedProject[0].updateContent
    // });
  }

  /** Select the new content chosen in the filter tabs component **/
  selectContentFromFilterTabs(selectedContent){
    this.setState({
      pageName                        : selectedContent[0].pageName,
      mainContentSelected             : selectedContent[0].mainContent,
      capacityBuildingContentSelected : selectedContent[0].capacityBuildingContent,
      awarenessContentSelected        : selectedContent[0].awarenessContent
    });
  }

  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    return (
        <div className="Home">

          {/* Header */}
          <Header sendToHome={this.selectProjectFromHeader} pageName={this.state.pageName} importedProjects={this.state.importedProjects}></Header>

          {/* Filter Tabs */}
          <FilterTabs sendToHome={this.selectContentFromFilterTabs}></FilterTabs>
          <Divider />

          {/* Contents */}
          {this.state.mainContentSelected             && (<MainContent             importedIndicators = {this.state.importedIndicators.global} ></MainContent>)}
          {this.state.capacityBuildingContentSelected && (<CapacityBuildingContent importedIndicators = {this.state.importedIndicators.global} ></CapacityBuildingContent>)}
          {this.state.awarenessContentSelected        && (<AwarenessContent></AwarenessContent>)}
        </div>
    );
  }
}

export default Home;
