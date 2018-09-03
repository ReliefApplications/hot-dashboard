/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './CapacityBuildingContent.css';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid           from '@material-ui/core/Grid';

/** Components **/
import WidgetGraph from "../../widget/Graph";

/** Plugins **/
import { VictoryChart }  from 'victory';
import { VictoryLine   }  from 'victory';
import { VictoryAxis  }  from 'victory';
import { VictoryGroup  }  from 'victory';
import { VictoryStack  }  from 'victory';
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
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.ramanihuria &&
                    (<WidgetGraph title = "Workshop numbers"
                                  graph = {<VictoryChart domainPadding={10}>
                                    <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
                                      <VictoryStack colorScale={"red"}>
                                        {<VictoryBar
                                            labelComponent={<VictoryTooltip/>}
                                            style  = {{ data: { fill: "#D73F3F" } }}
                                            data   = {[
                                              { x: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions[0].label,
                                                y: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions[0].nbAttendees,
                                                label: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions[0].nbAttendees + " people trained"
                                              },
                                            ]}
                                        />}
                                      </VictoryStack>
                                      <VictoryStack colorScale={"green"}>
                                        {<VictoryBar
                                            labelComponent={<VictoryTooltip/>}
                                            style  = {{ data: { fill: "#" } }}
                                            data   = {[
                                              { x: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions[0].label,
                                                y: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions[0].nbInstitutions,
                                                label: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions[0].nbInstitutions + " institutions trained"
                                              },
                                            ]}
                                        />}
                                      </VictoryStack>
                                    </VictoryGroup>
                                  </VictoryChart>
                                  }/>

                    )}
                  </Grid>

                  {/* Number of sub-wards complete */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.ramanihuria &&
                    (<WidgetGraph title = "Number of sub-wards complete"
                                  graph = {<VictoryChart domainPadding={ {x: 15}}>
                                    <VictoryAxis
                                        style={{ tickLabels: { padding: 20, angle: -0 } }}
                                    />
                                    <VictoryAxis
                                        dependentAxis
                                    />
                                    <VictoryLine
                                        style={{
                                          data   : { stroke: "#2C3038" },
                                          parent : { border: "1px solid #ccc"}
                                        }}
                                        data   = {[
                                          { x: this.props.importedData.ramanihuria.main.nbsubwardscompleted[0].Date,
                                            y: this.props.importedData.ramanihuria.main.nbsubwardscompleted[0].TOTAL
                                          },
                                          { x: this.props.importedData.ramanihuria.main.nbsubwardscompleted[1].Date,
                                            y: this.props.importedData.ramanihuria.main.nbsubwardscompleted[1].TOTAL
                                          },
                                          { x: this.props.importedData.ramanihuria.main.nbsubwardscompleted[2].Date,
                                            y: this.props.importedData.ramanihuria.main.nbsubwardscompleted[2].TOTAL
                                          },
                                          { x: this.props.importedData.ramanihuria.main.nbsubwardscompleted[3].Date,
                                            y: this.props.importedData.ramanihuria.main.nbsubwardscompleted[3].TOTAL
                                          }
                                        ]}
                                    />
                                  </VictoryChart>}
                        />
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
