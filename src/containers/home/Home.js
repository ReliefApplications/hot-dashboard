/** Natives **/
import React from 'react';

/** Containers **/
import Header             from '../../components/header/Header'
import FilterTabs         from '../../components/filter/ContentFilter'
import MainContentGlobal        from '../../components/content/global/MainContent'
import CapacityBuildingContentGlobal from '../../components/content/global/CapacityBuildingContent'
import AwarenessContentGlobal from '../../components/content/global/AwarenessContent'

/** CSS **/
import './Home.css';

/** Services **/
import Preprocess from "../../core/scripts/Preprocess";
import Reader from "../../core/utils/Reader";

/** Material **/
import Divider         from '@material-ui/core/Divider';

// const preProcessingService  = new PreProcessor();
const reader = new Reader();

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

      //By default, the global project and the main content are displayed
      projectName : 'Global', // Name of the actual project
      contentName : 'Main',   // Name of the actual content

      importedProjects    : [],
      importedData : [],
    };
  }

  //------------------------------------------------------------------------//
  //---------------------------------- Init --------------------------------//
  //------------------------------------------------------------------------//

  /** Call all datas file from the GitHub api once the page is rendered **/
  async componentDidMount() {
    new Preprocess().process();
    this.setState({importedData : await new Promise((resolve,reject) => {
      // Getting data from the preprocessed file
        reader.getJsonFromAWS()
            .then((data) =>{
              // Getting the projects names available
              this.setState({importedProjects: Object.keys(data)});
              resolve(data);
            })
            .catch((error) =>{
              this.setState({importedProjects: []});
              reject(error);
            });
      })
    });
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
    const { importedData }                    = this.state;

    return (
        <div className="Home">

          {/* Header */}
          <Header sendToHome={this.selectProjectFromHeader} contentName={this.state.contentName} importedProjects={this.state.importedProjects}></Header>

          {/* Filter Tabs */}
          <FilterTabs sendToHome={this.selectContentFromFilterTabs} contentName={this.state.contentName}></FilterTabs>

          {/* Line between filter component & content */}
          <Divider />

          {/* Contents */}
          {mainContentSelected             && (<this.state.MainContent             importedData = {importedData} ></this.state.MainContent>)}
          {capacityBuildingContentSelected && (<this.state.CapacityBuildingContent importedData = {importedData} ></this.state.CapacityBuildingContent>)}
          {awarenessContentSelected        && (<this.state.AwarenessContent importedData = {importedData}></this.state.AwarenessContent>)}
        </div>
    );
  }
}

export default Home;
