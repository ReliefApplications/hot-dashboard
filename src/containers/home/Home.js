/** Natives **/
import React from 'react';

/** Containers **/
import Header             from '../../components/header/Header'
import FilterTabs         from '../../components/filter/ContentFilter'
import MainContentGlobal        from '../../components/content/global/MainContent'
import CapacityBuildingContentGlobal from '../../components/content/global/CapacityBuildingContent'
import AwarenessContentGlobal from '../../components/content/global/AwarenessContent'
import MappingCommunityContent from '../../components/content/global/MappingCommunityContent'

/** CSS **/
import './Home.css';

/** Services **/
import Reader from "../../core/utils/Reader";

/** Material **/
import Divider         from '@material-ui/core/Divider';

const reader = new Reader();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.selectProjectFromHeader     = this.selectProjectFromHeader.bind(this);
    this.selectContentFromFilterTabs = this.selectContentFromFilterTabs.bind(this);
    this.state = {
      MainContent                     : MainContentGlobal,
      CapacityBuildingContent         : CapacityBuildingContentGlobal,
      AwarenessContent                : AwarenessContentGlobal,
      MappingCommunityContent         : MappingCommunityContent,
      menuLeft                        : false,    // State of the left menu.
      mainContentSelected             : true,     // When Main Content is selected
      capacityBuildingContentSelected : false,    // When Capacity Building Content is selected
      awarenessContentSelected        : false,    // When Awareness Content is selected
      MappingCommunitySelected         : false,    // When Mapping Community Content is selected

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
    // new Preprocess().process();
    this.setState({importedData : await new Promise((resolve,reject) => {
        // Getting data from the preprocessed file
        reader.getJsonFromAWS()
            .then((data) =>{
              // Getting the projects names available
              let projectsNames = Object.keys(data);
              // This push is only here to add the demo project manually to the project list
              projectsNames.push("demo");
              this.setState({importedProjects: projectsNames});
              resolve(data);
            })
            .catch((error) =>{
              this.setState({importedProjects: []});
              reject(error);
            });
      })
      // This .then function is only here to add fake content in order to display the menu buttons on the demo dashboard
          .then(function(res) {
            res["demo"] = {
              main: {data : "yes"},
              capacitybuilding: {data : "yes"},
              awareness: {data : "yes"},
              mappingcommunity: {data : "yes"}
            };
            return res;
          }
      )
    });
  }

  //------------------------------------------------------------------------//
  //---------------------- Project & Content display -----------------------//
  //------------------------------------------------------------------------//

  /** Selecting the project from the header button **/
  async selectProjectFromHeader(selectedProjectFromHeader){
    import('../../components/content/'+selectedProjectFromHeader+'/MainContent').then((res) => this.setState({MainContent : res.default}));
    import('../../components/content/'+selectedProjectFromHeader+'/CapacityBuildingContent').then((res) => this.setState({CapacityBuildingContent : res.default}));
    import('../../components/content/'+selectedProjectFromHeader+'/AwarenessContent').then((res) => this.setState({AwarenessContent : res.default}));
    import('../../components/content/'+selectedProjectFromHeader+'/MappingCommunityContent').then((res) => this.setState({MappingCommunityContent : res.default}));
    this.setState({
      contentName                     : 'Main',
      mainContentSelected             : true,
      capacityBuildingContentSelected : false,
      awarenessContentSelected        : false,
      MappingCommunitySelected        : false,
      projectName                     : selectedProjectFromHeader,
    });
  }

  /** Selecting the new content chosen in the filter tabs component **/
  selectContentFromFilterTabs(selectedContent){
    this.setState({
      contentName                     : selectedContent[0].contentName,
      mainContentSelected             : selectedContent[0].mainContent,
      capacityBuildingContentSelected : selectedContent[0].capacityBuildingContent,
      awarenessContentSelected        : selectedContent[0].awarenessContent,
      mappingCommunityContentSelected : selectedContent[0].mappingCommunityContent
    });
  }

  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    const { mainContentSelected }             = this.state;
    const { capacityBuildingContentSelected } = this.state;
    const { awarenessContentSelected }        = this.state;
    const { mappingCommunityContentSelected }        = this.state;
    const { importedData }                    = this.state;

    return (
        <div className="Home">

          {/* Header */}
          <Header sendToHome={this.selectProjectFromHeader} contentName={this.state.contentName} importedProjects={this.state.importedProjects}></Header>

          {/* Filter Tabs */}
          <FilterTabs sendToHome={this.selectContentFromFilterTabs} contentName={this.state.contentName} importedData={importedData[this.state.projectName.toLowerCase()]}></FilterTabs>

          {/* Line between filter component & content */}
          <Divider />

          {/* Contents */}
          {mainContentSelected             && (<this.state.MainContent             importedData = {importedData} ></this.state.MainContent>)}
          {capacityBuildingContentSelected && (<this.state.CapacityBuildingContent importedData = {importedData} ></this.state.CapacityBuildingContent>)}
          {awarenessContentSelected        && (<this.state.AwarenessContent importedData = {importedData}></this.state.AwarenessContent>)}
          {mappingCommunityContentSelected        && (<this.state.MappingCommunityContent importedData = {importedData}></this.state.MappingCommunityContent>)}
        </div>
    );
  }
}

export default Home;
