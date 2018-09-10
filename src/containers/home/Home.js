/** Natives **/
import React from 'react';

/** Containers **/
import Header             from '../../components/header/Header'
import FilterTabs         from '../../components/filter/ContentFilter'
import MappingContentGlobal        from '../../components/content/global/MappingContent'
import CapacityBuildingContentGlobal from '../../components/content/global/CapacityBuildingContent'
import AwarenessContentGlobal from '../../components/content/global/AwarenessContent'
import CommunityContent from '../../components/content/global/CommunityContent'

/** CSS **/
import './Home.css';

/** Services **/
import Reader from "../../core/utils/Reader";

/** Material **/
import Divider         from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';

const reader = new Reader();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.selectProjectFromHeader     = this.selectProjectFromHeader.bind(this);
    this.selectContentFromFilterTabs = this.selectContentFromFilterTabs.bind(this);
    this.state = {
      MappingContent                  : MappingContentGlobal,
      CapacityBuildingContent         : CapacityBuildingContentGlobal,
      AwarenessContent                : AwarenessContentGlobal,
      CommunityContent                : CommunityContent,
      menuLeft                        : false,    // State of the left menu.
      mappingContentSelected          : true,     // When Mapping Content is selected
      capacityBuildingContentSelected : false,    // When Capacity Building Content is selected
      awarenessContentSelected        : false,    // When Awareness Content is selected
      CommunitySelected               : false,    // When Community Content is selected

      //By default, the global project and the main content are displayed
      projectName : 'Global', // Name of the actual project
      contentName : 'Mapping',   // Name of the actual content

      importedProjects    : [],
      importedData : [],
      loading: true,
    };
  }

  //------------------------------------------------------------------------//
  //---------------------------------- Init --------------------------------//
  //------------------------------------------------------------------------//

  /** Call all datas file from the GitHub api once the page is rendered **/
  async componentDidMount() {
    this.setState({importedData : await new Promise((resolve,reject) => {
        // Getting data from the preprocessed file
        reader.getJsonFromAWS()
            .then((data) =>{
              // Getting the projects names available
              let projectsNames = Object.keys(data);
              // This push is only here to add the demo project manually to the project list
              projectsNames.push("demo");
              this.setState({
                importedProjects: projectsNames,
                loading: false
              });
              resolve(data);
            })
            .catch((error) =>{
              this.setState({importedProjects: []});
              reject(error);
            });
      })
      // This .then function is only here to add fake content in order to display the menu buttons on the demo dashboard
          .then(function(res) {
            // console.log("*********HOME***********", res);
            res["demo"] = {
              mapping: {data : "yes"},
              capacitybuilding: {data : "yes"},
              awareness: {data : "yes"},
              community: {data : "yes"}
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
    this.setState({
      loading: true
    });
    import('../../components/content/'+selectedProjectFromHeader+'/MappingContent').then((res) => this.setState({MappingContent : res.default}));
    import('../../components/content/'+selectedProjectFromHeader+'/CapacityBuildingContent').then((res) => this.setState({CapacityBuildingContent : res.default}));
    import('../../components/content/'+selectedProjectFromHeader+'/AwarenessContent').then((res) => this.setState({AwarenessContent : res.default}));
    import('../../components/content/'+selectedProjectFromHeader+'/CommunityContent').then((res) => this.setState({CommunityContent : res.default}));
    this.setState({
      contentName                     : 'Mapping',
      mappingContentSelected          : true,
      capacityBuildingContentSelected : false,
      awarenessContentSelected        : false,
      communityContentSelected        : false,
      projectName                     : selectedProjectFromHeader,
      loading: false
    });
  }

  /** Selecting the new content chosen in the filter tabs component **/
  async selectContentFromFilterTabs(selectedContent){
    this.setState({
      loading: true
    });
    this.setState({
      contentName                     : selectedContent[0].contentName,
      mappingContentSelected          : selectedContent[0].mappingContent,
      capacityBuildingContentSelected : selectedContent[0].capacityBuildingContent,
      awarenessContentSelected        : selectedContent[0].awarenessContent,
      communityContentSelected        : selectedContent[0].communityContent,
      loading: false
    });
  }

  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    const { mappingContentSelected }          = this.state;
    const { capacityBuildingContentSelected } = this.state;
    const { awarenessContentSelected }        = this.state;
    const { communityContentSelected }        = this.state;
    const { importedData }                    = this.state;

    return (
        <div className="Home">
          {/* Header */}
          <Header sendToHome={this.selectProjectFromHeader} contentName={this.state.contentName} importedProjects={this.state.importedProjects}></Header>

          {/* Filter Tabs */}
          <FilterTabs sendToHome={this.selectContentFromFilterTabs} contentName={this.state.contentName} importedData={importedData[this.state.projectName.toLowerCase()]}></FilterTabs>

          {/* Line between filter component & content */}
          <Divider />
          {this.state.loading          && (<CircularProgress id="loader" style={{ color: "#D73F3F" }} thickness={7} />)}
          {/* Contents */}
          {!this.state.loading         && mappingContentSelected          && (<this.state.MappingContent          importedData = {importedData}/>)}
          {!this.state.loading         && capacityBuildingContentSelected && (<this.state.CapacityBuildingContent importedData = {importedData}/>)}
          {!this.state.loading         && awarenessContentSelected        && (<this.state.AwarenessContent        importedData = {importedData}/>)}
          {!this.state.loading         && communityContentSelected        && (<this.state.CommunityContent        importedData = {importedData}/>)}
        </div>
    );
  }
}

export default Home;
