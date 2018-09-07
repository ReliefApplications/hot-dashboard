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
import WidgetGraph from "../../widget/Graph";
import WidgetIndicator from "../../widget/Indicator";

/** Plugins **/
import { VictoryChart }  from 'victory';
import { VictoryAxis  }  from 'victory';
import { VictoryBar  }  from 'victory';
import { VictoryTooltip }  from 'victory';

/** Themes **/
const GlobalTheme = createMuiTheme({
  typography: {
    fontSize   :  18,
    fontFamily : "'Barlow Condensed', sans-serif"
  },
});


class CapacityBuildingContent extends Component {
  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    const nbAttendeesData = function (data) {
      let res = [];
      for (let i=0; i<4; i++)
      {
        res.push({
          x: data[i].label,
          y: data[i].nbAttendees,
          label: data[i].nbAttendees + " people trained"
        })
      }
      return res;
    };
    const nbInstitutionsData = function (data) {
      let sortInstitutions = function (a, b) {
        if (a.y < b.y) {
            return -1;
        } else if (a.y > b.y) {
          return 1;
        } else {
          return 0;
        }
      };

      let res = [];
      for (let i=0; i<data.length; i++)
      {
        res.push({
          x: data[i].shorten,
          y: data[i].nbAttendees,
          label: data[i].nbAttendees + " attendees"
        });
      }
      res.sort(sortInstitutions);
      return res;
    };
    const tableToData = function (data, customLabel) {
      let res = [];
      for (let i=0; i<data.length; i++)
      {
        res.push({
          x: data[i].label,
          y: data[i].value,
          label: data[i].value + " " + customLabel
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
                  {/* Organizations supported */}
                  <Grid item xs={12} sm={6} md={3}>
                    {this.props.importedData.ramanihuria.capacitybuilding.nborganizations &&
                    (<WidgetIndicator title={this.props.importedData.ramanihuria.capacitybuilding.nborganizations.title}
                                      img={mapIMG}
                                      data={this.props.importedData.ramanihuria.capacitybuilding.nborganizations.data.length}/>)}
                  </Grid>

                </Grid>

                {/* Second row */}
                {/* Number of attendees monthly */}
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
                  {/* Number of workshop attendees */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.ramanihuria.capacitybuilding.nbAttendeesMonthly &&
                    (<WidgetGraph title = {this.props.importedData.ramanihuria.capacitybuilding.nbAttendeesMonthly.title}
                                  graph = {<VictoryChart domainPadding={15}>
                                    <VictoryAxis
                                        style = {{ tickLabels: { padding: 20 } }}
                                    />
                                    <VictoryAxis
                                        dependentAxis
                                        style = {{ tickLabels: { padding: 20 } }}
                                    />
                                    {<VictoryBar
                                        labelComponent={<VictoryTooltip/>}
                                        style  = {{ data: { fill: "#D73F3F" } }}
                                        data   = {nbAttendeesData(this.props.importedData.ramanihuria.capacitybuilding.nbAttendeesMonthly.data)}
                                    />}
                                  </VictoryChart>
                                  }/>

                    )}
                  </Grid>

                  {/* Number of attendees trained per institutions */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.ramanihuria.capacitybuilding.nbAttendeesInstitutions &&
                    (<WidgetGraph title = {this.props.importedData.ramanihuria.capacitybuilding.nbAttendeesInstitutions.title}
                                  graph = {<VictoryChart domainPadding={15}>
                                    <VictoryAxis
                                        style={{ tickLabels: { padding: 20 } }}
                                    />
                                    <VictoryAxis
                                        dependentAxis
                                    />
                                    {<VictoryBar horizontal
                                        labelComponent={<VictoryTooltip/>}
                                        style  = {{ data: { fill: "#D73F3F" } }}
                                        data   = {nbInstitutionsData(this.props.importedData.ramanihuria.capacitybuilding.nbAttendeesInstitutions.data)}
                                    />}
                                  </VictoryChart>
                                  }/>

                    )}
                  </Grid>

                  {/* Number of attendees trained per institutions */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.ramanihuria.capacitybuilding.nbAttendeesTraining &&
                    (<WidgetGraph title = {this.props.importedData.ramanihuria.capacitybuilding.nbAttendeesTraining.title}
                                  graph = {<VictoryChart domainPadding={15}>
                                    <VictoryAxis
                                        style={{ tickLabels: { padding: 20 } }}
                                    />
                                    <VictoryAxis
                                        dependentAxis
                                    />
                                    {<VictoryBar
                                                 labelComponent={<VictoryTooltip/>}
                                                 style  = {{ data: { fill: "#D73F3F" } }}
                                                 data   = {tableToData(this.props.importedData.ramanihuria.capacitybuilding.nbAttendeesTraining.data, "trainings")}
                                    />}
                                  </VictoryChart>
                                  }/>

                    )}
                  </Grid>

                  {/* Number of workshops per month */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.ramanihuria.capacitybuilding.nbWorkshops &&
                    (<WidgetGraph title = {this.props.importedData.ramanihuria.capacitybuilding.nbWorkshops.title}
                                  graph = {<VictoryChart domainPadding={15}>
                                    <VictoryAxis
                                        style={{ tickLabels: { padding: 20 } }}
                                    />
                                    <VictoryAxis
                                        dependentAxis
                                    />
                                    <VictoryBar
                                                 labelComponent={<VictoryTooltip/>}
                                                 style  = {{ data: { fill: "#D73F3F" } }}
                                                 data   = {tableToData(this.props.importedData.ramanihuria.capacitybuilding.nbWorkshops.data, "workshops")}
                                    />
                                  </VictoryChart>
                                  }/>

                    )}
                  </Grid>
                  {/* Training by genders */}
                  {/*<Grid item xs={12} sm={6} md={4}>*/}
                  {/*{this.props.importedIndicators.global && (*/}
                  {/*<WidgetGraph title = "Trainings (by gender)"*/}
                  {/*graph = {<VictoryPie*/}
                  {/*padAngle    = {2}*/}
                  {/*innerRadius = {100}*/}
                  {/*width       = {475}*/}
                  {/*colorScale  = {[ "#FAA71E", "#D73F3F"]}*/}
                  {/*style={{ labels: {fontSize: 18} }}*/}
                  {/*data = {[*/}
                  {/*{ x: "Women", y: this.props.importedData.ramanihuria.capacitybuilding.trainings.women },*/}
                  {/*{ x: "Men",   y: this.props.importedData.ramanihuria.capacitybuilding.trainings.men },*/}
                  {/*]}*/}
                  {/*/>}/>)}*/}
                  {/*</Grid>*/}

                </Grid>
              </MuiThemeProvider>
          )}
        </div>
    );
  }
}

export default CapacityBuildingContent;
