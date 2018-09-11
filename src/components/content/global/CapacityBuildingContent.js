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
import WidgetIndicator from '../../widget/Indicator';
import WidgetGraph from "../../widget/Graph";

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
    const tableToData = function (data, customLabel, sortingChoice) {
      let dataSort = function (a, b) {
        if (a.y < b.y) {
          return -1;
        } else if (a.y > b.y) {
          return 1;
        } else {
          return 0;
        }
      };
      let res = [];
      for (let i=data.length-1; i>=0; i--)
      {
        res.push({
          x: data[i].label,
          y: data[i].value,
          label: data[i].value + " " + customLabel
        })
      }
      switch (sortingChoice) {
        case "data":
          res.sort(dataSort);
          break;
        default:
      }      return res;
    };

    return (
        // The padding prevent the page to be too wide because of the option spacing
        <div style={{ padding: 12 }}>
          {this.props.importedData &&
          (<MuiThemeProvider theme={GlobalTheme}>
                {/* First row */}
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
                  {/* Workshops that happened */}
                  <Grid item xs={12} sm={6} md={3}>
                    {this.props.importedData.global.capacitybuilding.totalOrganizationsSupported &&
                    (<WidgetIndicator title={this.props.importedData.global.capacitybuilding.totalOrganizationsSupported.title}
                                      img={mapIMG}
                                      data={this.props.importedData.global.capacitybuilding.totalOrganizationsSupported.value}/>)}
                  </Grid>

                </Grid>

                {/* Second row */}
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
                  {/* Number of attendees monthly */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global.capacitybuilding.totalNbAttendeesMonthly &&
                    (<WidgetGraph title = {this.props.importedData.global.capacitybuilding.totalNbAttendeesMonthly.title}
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
                                        data   = {tableToData(this.props.importedData.global.capacitybuilding.totalNbAttendeesMonthly.data, "people trained")}
                                    />}
                                  </VictoryChart>
                                  }/>

                    )}
                  </Grid>

                  {/* Number of attendees trained per institutions */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global.capacitybuilding.totalNbAttendeesInstitutions &&
                    (<WidgetGraph title = {this.props.importedData.global.capacitybuilding.totalNbAttendeesInstitutions.title}
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
                                                 data   = {tableToData(this.props.importedData.global.capacitybuilding.totalNbAttendeesInstitutions.data, "attendees", "data")}
                                    />}
                                  </VictoryChart>}
                                  data = {this.props.importedData.global.capacitybuilding.totalNbAttendeesInstitutions.data}
                        />

                    )}
                  </Grid>

                  {/* Number of attendees trained per institutions */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global.capacitybuilding.totalNbAttendeesTraining &&
                    (<WidgetGraph title = {this.props.importedData.global.capacitybuilding.totalNbAttendeesTraining.title}
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
                                        data   = {tableToData(this.props.importedData.global.capacitybuilding.totalNbAttendeesTraining.data, "trainings")}
                                    />}
                                  </VictoryChart>}
                                  data = {this.props.importedData.global.capacitybuilding.totalNbAttendeesTraining.data}
                        />

                    )}
                  </Grid>

                  {/* Number of workshops per month */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global.capacitybuilding.totalNbWorkshops &&
                    (<WidgetGraph title = {this.props.importedData.global.capacitybuilding.totalNbWorkshops.title}
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
                                        data   = {tableToData(this.props.importedData.global.capacitybuilding.totalNbWorkshops.data, "workshops")}
                                    />
                                  </VictoryChart>}
                        />

                    )}
                  </Grid>
                </Grid>
              </MuiThemeProvider>
          )}
        </div>
    );
  }
}

export default CapacityBuildingContent;
