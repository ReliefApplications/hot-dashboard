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
    return (
        // The padding prevent the page to be too wide because of the option spacing
        <div style={{ padding: 12 }}>
          {this.props.importedData &&
          (<MuiThemeProvider theme={GlobalTheme}>
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}

                  {/* First row */}
                  {/* Number of people trained */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.ramanihuria &&
                    (<WidgetGraph title = {this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.titleAttendees}
                                  graph = {<VictoryChart domainPadding={15}>
                                    <VictoryAxis
                                        style={{ tickLabels: { padding: 20, angle: -0 } }}
                                    />
                                    <VictoryAxis
                                        dependentAxis
                                    />
                                    {<VictoryBar
                                        labelComponent={<VictoryTooltip/>}
                                        style  = {{ data: { fill: "#D73F3F" } }}
                                        data   = {[
                                          { x: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[0].label,
                                            y: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[0].nbAttendees,
                                            label: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[0].nbAttendees + " people trained"
                                          },
                                          { x: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[1].label,
                                            y: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[1].nbAttendees,
                                            label: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[1].nbAttendees + " people trained"
                                          },
                                          { x: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[2].label,
                                            y: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[2].nbAttendees,
                                            label: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[2].nbAttendees + " people trained"
                                          },
                                          { x: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[3].label,
                                            y: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[3].nbAttendees,
                                            label: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[3].nbAttendees + " people trained"
                                          },
                                        ]}
                                    />}
                                  </VictoryChart>
                                  }/>

                    )}
                  </Grid>

                  {/* Workshops that happened */}
                  <Grid item xs={12} sm={6} md={3}>
                    {this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions &&
                    (<WidgetIndicator title={this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.titleWorkshop}
                                      img={mapIMG}
                                      data={this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.workshops}/>)}
                  </Grid>

                  {/* Number of institutions trained */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.ramanihuria &&
                    (<WidgetGraph title = {this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.titleInstitutions}
                                  graph = {<VictoryChart domainPadding={15}>
                                    <VictoryAxis
                                        style={{ tickLabels: { padding: 20, angle: -0 } }}
                                    />
                                    <VictoryAxis
                                        dependentAxis
                                    />
                                    {<VictoryBar
                                        labelComponent={<VictoryTooltip/>}
                                        style  = {{ data: { fill: "#D73F3F" } }}
                                        data   = {[
                                          { x: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[0].label,
                                            y: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[0].nbInstitutions,
                                            label: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[0].nbInstitutions + " institutions trained"
                                          },
                                          { x: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[1].label,
                                            y: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[1].nbInstitutions,
                                            label: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[1].nbInstitutions + " institutions trained"
                                          },
                                          { x: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[2].label,
                                            y: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[2].nbInstitutions,
                                            label: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[2].nbInstitutions + " institutions trained"
                                          },
                                          { x: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[3].label,
                                            y: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[3].nbInstitutions,
                                            label: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[3].nbInstitutions + " institutions trained"
                                          },
                                        ]}
                                    />}
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
