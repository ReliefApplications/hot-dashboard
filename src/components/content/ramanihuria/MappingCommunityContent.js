/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './CapacityBuildingContent.css';

/** Logos **/
import mapIMG from "../../../assets/images/logos/map.png";

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid           from '@material-ui/core/Grid';

/** Components **/
import WidgetIndicator from "../../widget/Indicator";
import WidgetGraph from "../../widget/Graph";

/** Plugins **/
import { VictoryChart }  from 'victory';
import { VictoryAxis  }  from 'victory';
import { VictoryBar  }  from 'victory';
import { VictoryTooltip }  from 'victory';
import { VictoryGroup }  from 'victory';
import { VictoryStack }  from 'victory';

/** Themes **/
const GlobalTheme = createMuiTheme({
  typography: {
    fontSize   :  18,
    fontFamily : "'Barlow Condensed', sans-serif"
  },
});


class MappingCommunityContent extends Component {
  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    const nbParticipantsWomen = function (data) {
      let res = [];
      for (let i=0; i<data.length; i++)
      {
        res.push({
          x: data[i].label,
          y: data[i].female,
          label: data[i].female + " women participants"
        })
      }
      return res;
    };
    const nbParticipantsMen = function (data) {
      let res = [];
      for (let i=0; i<data.length; i++)
      {
        res.push({
          x: data[i].label,
          y: data[i].male,
          label: data[i].male + " men participants"
        })
      }
      return res;
    };
    const nbParticipantsOld = function (data) {
      let res = [];
      for (let i=0; i<data.length; i++)
      {
        res.push({
          x: data[i].label,
          y: data[i].old,
          label: data[i].old + " old participants"
        })
      }
      return res;
    };
    const nbParticipantsNew = function (data) {
      let res = [];
      for (let i=0; i<data.length; i++)
      {
        res.push({
          x: data[i].label,
          y: data[i].new,
          label: data[i].new + " new participants"
        })
      }
      return res;
    };

    return (
        // The padding prevent the page to be too wide because of the option spacing
        <div style={{ padding: 12 }}>
          {this.props.importedData &&
          (<MuiThemeProvider theme={GlobalTheme}>
                {/* First row */}
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
                  {/* Events conducted */}
                  <Grid item xs={12} sm={6} md={3}>
                    {this.props.importedData.ramanihuria.mappingcommunity.nbEvents &&
                    (<WidgetIndicator title={this.props.importedData.ramanihuria.mappingcommunity.nbEvents.title}
                                      img={mapIMG}
                                      data={this.props.importedData.ramanihuria.mappingcommunity.nbEvents.data}/>)}
                  </Grid>
                </Grid>

                {/* Second row */}
                {/* Number of people participating in an event */}
                <Grid item xs={12} sm={6} md={4}>
                  {this.props.importedData.ramanihuria.mappingcommunity.nbParticipants &&
                  (<WidgetGraph title = {this.props.importedData.ramanihuria.mappingcommunity.nbParticipants.title}
                                graph = {<VictoryChart domainPadding={15}>
                                  <VictoryAxis
                                      style={{ tickLabels: { padding: 20 } }}
                                  />
                                  <VictoryAxis
                                      dependentAxis
                                  />
                                  <VictoryGroup offset={10} style={{ data: { width: 15 } }}>
                                    <VictoryStack>
                                      <VictoryBar
                                          labelComponent={<VictoryTooltip/>}
                                          style  = {{ data: { fill: "#D73F3F" } }}
                                          data   = {nbParticipantsWomen(this.props.importedData.ramanihuria.mappingcommunity.nbParticipants.data)}
                                      />
                                      <VictoryBar
                                          labelComponent={<VictoryTooltip/>}
                                          style  = {{ data: { fill: "#FAA71E" } }}
                                          data   = {nbParticipantsMen(this.props.importedData.ramanihuria.mappingcommunity.nbParticipants.data)}
                                      />
                                    </VictoryStack>
                                    <VictoryStack>
                                      <VictoryBar
                                          labelComponent={<VictoryTooltip/>}
                                          style  = {{ data: { fill: "#D73F3F" } }}
                                          data   = {nbParticipantsNew(this.props.importedData.ramanihuria.mappingcommunity.nbParticipants.data)}
                                      />
                                      <VictoryBar
                                          labelComponent={<VictoryTooltip/>}
                                          style  = {{ data: { fill: "#FAA71E" } }}
                                          data   = {nbParticipantsOld(this.props.importedData.ramanihuria.mappingcommunity.nbParticipants.data)}
                                      />
                                    </VictoryStack>
                                  </VictoryGroup>
                                </VictoryChart>
                                }/>

                  )}
                </Grid>
              </MuiThemeProvider>
          )}
        </div>
    );
  }
}

export default MappingCommunityContent;
