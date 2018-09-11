/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './CapacityBuildingContent.css';

/** Logos **/
import mapathonsIMG from "../../../assets/images/logos/mapathons.png";

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
import { VictoryStack }  from 'victory';

/** Themes **/
const GlobalTheme = createMuiTheme({
  typography: {
    fontSize   :  18,
    fontFamily : "'Barlow Condensed', sans-serif"
  },
});


class CommunityContent extends Component {
  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    const tableToData = function (data, customLabel, dataDisplayed) {
      let res = [];
      for (let i=data.length-1; i>=0; i--)
      {
        res.push({
          x: data[i].label,
          y: data[i][dataDisplayed],
          label: data[i][dataDisplayed] + " " + customLabel
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
              {this.props.importedData.ramanihuria.community.nbEvents &&
              (<WidgetIndicator title={this.props.importedData.ramanihuria.community.nbEvents.title}
                                img={mapathonsIMG}
                                data={this.props.importedData.ramanihuria.community.nbEvents.data}/>)}
            </Grid>
          </Grid>

          {/* Second row */}
          <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
            {/* Number of people participating in an event */}
            <Grid item xs={12} sm={6} md={4}>
              {this.props.importedData.ramanihuria.community.nbParticipantsGender &&
              (<WidgetGraph title = {this.props.importedData.ramanihuria.community.nbParticipantsGender.title}
                            graph = {<VictoryChart domainPadding={30}>
                              <VictoryAxis
                                  style={{ tickLabels: { padding: 20 } }}
                              />
                              <VictoryAxis
                                  dependentAxis
                              />
                              <VictoryStack>
                                <VictoryBar
                                    labelComponent={<VictoryTooltip/>}
                                    style  = {{ data: { fill: "#D73F3F" } }}
                                    data   = {tableToData(this.props.importedData.ramanihuria.community.nbParticipantsGender.data, "women participants", "female")}
                                />
                                <VictoryBar
                                    labelComponent={<VictoryTooltip/>}
                                    style  = {{ data: { fill: "#FAA71E" } }}
                                    data   = {tableToData(this.props.importedData.ramanihuria.community.nbParticipantsGender.data, "men participants", "male")}
                                />
                              </VictoryStack>
                            </VictoryChart>
                            }/>
              )}
            </Grid>

            {/* Number of people participating in an event */}
            <Grid item xs={12} sm={6} md={4}>
              {this.props.importedData.ramanihuria.community.nbParticipantsNew &&
              (<WidgetGraph title = {this.props.importedData.ramanihuria.community.nbParticipantsNew.title}
                            graph = {<VictoryChart domainPadding={30}>
                              <VictoryAxis
                                  style={{ tickLabels: { padding: 20 } }}
                              />
                              <VictoryAxis
                                  dependentAxis
                              />
                              <VictoryStack>
                                <VictoryBar
                                    labelComponent={<VictoryTooltip/>}
                                    style  = {{ data: { fill: "#D73F3F" } }}
                                    data   = {tableToData(this.props.importedData.ramanihuria.community.nbParticipantsNew.data, "new participants", "new")}
                                />
                                <VictoryBar
                                    labelComponent={<VictoryTooltip/>}
                                    style  = {{ data: { fill: "#FAA71E" } }}
                                    data   = {tableToData(this.props.importedData.ramanihuria.community.nbParticipantsNew.data, "old participants", "old")}
                                />
                              </VictoryStack>
                            </VictoryChart>
                            }/>
                  )}
                </Grid>
              </Grid>
            </MuiThemeProvider>
          )}
        </div>
    );
  }
}

export default CommunityContent;
