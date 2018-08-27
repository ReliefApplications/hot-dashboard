/** Natives **/
import React, { Component } from 'react';

/** Material UI **/
import Button          from '@material-ui/core/Button';

/** CSS **/
import './Filter.css';

/** Constants **/
// import {BUTTONSSTYLE} from '../../core/external/Constants';

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


class FilterTabs extends Component {
  constructor(props) {
    super(props)
    this.selectContent = this.selectContent.bind(this);

    this.state = {
      displayedContent : 'main'
    };
  }

  /** Open content & close mini menu **/
  selectContent = (content) => () => {
    console.log(this.props.contentName);
    let selectedContent = []; //Object sended to container (Home)

    // Initialize all content state to false
    let selectedcontentName               = '';
    let mainContentChanged             = false;
    let capacityBuildingContentChanged = false;
    let awarenessContentChanged        = false;

    // Check which button is clicked
    if     (content === 'main')              { mainContentChanged             = true;  selectedcontentName='Main';              }
    else if(content === 'capacity_building') { capacityBuildingContentChanged = true;  selectedcontentName='Capacity building'; }
    else if(content === 'awareness')         { awarenessContentChanged        = true;  selectedcontentName='Awareness';         }

    // Push new item to the array to send
    selectedContent.push({
      contentName             : selectedcontentName,
      mainContent             : mainContentChanged,
      capacityBuildingContent : capacityBuildingContentChanged,
      awarenessContent        : awarenessContentChanged
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
          <Button style     = {(this.props.contentName === 'Main') ? FilterSelected : Buttons}
                  variant   = "contained"
                  component = "span"
                  onClick   = {this.selectContent('main')}>
            Main
          </Button>


          {/* 'Capacity building' button */}
          <Button style     = {(this.props.contentName === 'Capacity building') ? FilterSelected : Buttons}
                  variant   = "contained"
                  component = "span"
                  onClick   = {this.selectContent('capacity_building')}>
            Capacity building
          </Button>


          {/* 'Awareness' button */}
          <Button style     = {(this.props.contentName === 'Awareness') ? FilterSelected : Buttons}
                  variant   = "contained"
                  component = "span"
                  onClick   = {this.selectContent('awareness')}>
            Awareness
          </Button>
        </div>
    );
  }
}

export default FilterTabs;