/** Natives **/
import React, { Component } from 'react';

/** Material UI **/
import Button          from '@material-ui/core/Button';

/** CSS **/
import './ContentFilter.css';

/** Styles **/
const Buttons = {
  background : '#FFFFFF',
  color      : '#D73F3F',
  margin     : '0 0 0 5px',
  fontFamily : "'Barlow Condensed', sans-serif",
  fontSize   :  18
};
const FilterSelected = {
  background : '#D73F3F',
  color      : 'white',
  margin     : '0 0 0 5px',
  fontFamily : "'Barlow Condensed', sans-serif",
  fontSize   :  18,
};


class ContentFilter extends Component {
  constructor(props) {
    super(props);
    this.selectContent = this.selectContent.bind(this);

    this.state = {
      displayedContent : 'main'
    };
  }

  /** Open content & close mini menu **/
  selectContent = (content) => () => {
    // console.log(this.props.contentName);
    let selectedContent = []; //Object sended to container (Home)

    // Initialize all content state to false
    let selectedcontentName            = '';
    let mainContentChanged             = false;
    let capacityBuildingContentChanged = false;
    let awarenessContentChanged        = false;
    let MappingCommunityContentChanged = false;

    // Check which button is clicked
    if     (content === 'main')              { mainContentChanged             = true;  selectedcontentName='Main';              }
    else if(content === 'capacity_building') { capacityBuildingContentChanged = true;  selectedcontentName='Capacity building'; }
    else if(content === 'awareness')         { awarenessContentChanged        = true;  selectedcontentName='Awareness';         }
    else if(content === 'mapping_community') { MappingCommunityContentChanged = true;  selectedcontentName='Mapping community'; }

    // Push new item to the array to send
    selectedContent.push({
      contentName             : selectedcontentName,
      mainContent             : mainContentChanged,
      capacityBuildingContent : capacityBuildingContentChanged,
      awarenessContent        : awarenessContentChanged,
      mappingCommunityContent : MappingCommunityContentChanged
    });

    this.setState({
      displayedContent : content
    });
    // Sending the array
    this.props.sendToHome(selectedContent)
  };



  render() {
    return (
        <div className="tabs">
          {/* 'Main' button */}
          {(this.props.importedData === undefined) ?
              null
              : ((Object.keys(this.props.importedData.main).length !== 0) ?
                  <Button style     = {(this.props.contentName === 'Main') ? FilterSelected : Buttons}
                          variant   = "contained"
                          component = "span"
                          onClick   = {this.selectContent('main')}>
                  Main
                  </Button>
                      : null)}

          {/* 'Capacity building' button */}
          {(this.props.importedData === undefined) ?
              null
              : ((Object.keys(this.props.importedData.capacitybuilding).length !== 0) ?
                  <Button style     = {(this.props.contentName === 'Capacity building') ? FilterSelected : Buttons}
                          variant   = "contained"
                          component = "span"
                          onClick   = {this.selectContent('capacity_building')}>
                    Capacity building
                  </Button>
                  : null)}

          {/* 'Mapping Community' button */}
          {(this.props.importedData === undefined) ?
              null
              : ((Object.keys(this.props.importedData.mappingcommunity).length !== 0) ?
                  <Button style     = {(this.props.contentName === 'Mapping community') ? FilterSelected : Buttons}
                          variant   = "contained"
                          component = "span"
                          onClick   = {this.selectContent('mapping_community')}>
                    Mapping community
                  </Button>
                  : null)}

          {/* 'Awareness' button */}
          {(this.props.importedData === undefined) ?
              null
              : ((Object.keys(this.props.importedData.awareness).length !== 0) ?
                <Button style     = {(this.props.contentName === 'Awareness') ? FilterSelected : Buttons}
                        variant   = "contained"
                        component = "span"
                        onClick   = {this.selectContent('awareness')}>
                  Awareness
                </Button>
                : null)}
        </div>
    );
  }
}

export default ContentFilter;