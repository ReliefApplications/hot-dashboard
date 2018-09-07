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
    return (
        // The padding prevent the page to be too wide because of the option spacing
        <div style={{ padding: 12 }}>
          {this.props.importedData.global.capacitybuilding &&
          (<MuiThemeProvider theme={GlobalTheme}>
                {/* First row */}
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
                  {/* Workshops that happened */}
                  <Grid item xs={12} sm={6} md={3}>
                    {this.props.importedData.global.capacitybuilding.y &&
                    (<WidgetIndicator title={this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.titleWorkshop}
                                      img={mapIMG}
                                      data={this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.workshops}/>)}
                  </Grid>

                </Grid>

                {/* Second row */}
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
                  {/* Number of people trained */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global.capacitybuilding.y &&
                    (<WidgetGraph title = {this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.titleAttendees}
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
                                          // { x: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[0].label,
                                          //   y: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[0].nbAttendees,
                                          //   label: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[0].nbAttendees + " people trained"
                                          // },
                                          // { x: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[1].label,
                                          //   y: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[1].nbAttendees,
                                          //   label: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[1].nbAttendees + " people trained"
                                          // },
                                          // { x: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[2].label,
                                          //   y: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[2].nbAttendees,
                                          //   label: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[2].nbAttendees + " people trained"
                                          // },
                                          // { x: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[3].label,
                                          //   y: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[3].nbAttendees,
                                          //   label: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[3].nbAttendees + " people trained"
                                          // },
                                        ]}
                                    />}
                                  </VictoryChart>
                                  }/>

                    )}
                  </Grid>

                  {/* Number of institutions trained */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global.capacitybuilding.y &&
                    (<WidgetGraph title = {this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.titleInstitutions}
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
                                          // { x: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[0].label,
                                          //   y: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[0].nbInstitutions,
                                          //   label: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[0].nbInstitutions + " institutions trained"
                                          // },
                                          // { x: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[1].label,
                                          //   y: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[1].nbInstitutions,
                                          //   label: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[1].nbInstitutions + " institutions trained"
                                          // },
                                          // { x: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[2].label,
                                          //   y: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[2].nbInstitutions,
                                          //   label: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[2].nbInstitutions + " institutions trained"
                                          // },
                                          // { x: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[3].label,
                                          //   y: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[3].nbInstitutions,
                                          //   label: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[3].nbInstitutions + " institutions trained"
                                          // },
                                        ]}
                                    />}
                                  </VictoryChart>
                                  }/>

                    )}
                  </Grid>

                  {/* Number of sub-wards complete */}
                  {/*<Grid item xs={12} sm={6} md={4}>*/}
                  {/*{this.props.importedData.global &&*/}
                  {/*(<WidgetGraph title = "Number of sub-wards complete"*/}
                  {/*graph = {<VictoryChart domainPadding={ {x: 15}}>*/}
                  {/*<VictoryAxis*/}
                  {/*style={{ tickLabels: { padding: 20, angle: -0 } }}*/}
                  {/*/>*/}
                  {/*<VictoryAxis*/}
                  {/*dependentAxis*/}
                  {/*/>*/}
                  {/*<VictoryLine*/}
                  {/*style={{*/}
                  {/*data   : { stroke: "#2C3038" },*/}
                  {/*parent : { border: "1px solid #ccc"}*/}
                  {/*}}*/}
                  {/*data   = {[*/}
                  {/*{ x: this.props.importedData.global.main.nbsubwardscompleted[0].Date,*/}
                  {/*y: this.props.importedData.global.main.nbsubwardscompleted[0].TOTAL*/}
                  {/*},*/}
                  {/*{ x: this.props.importedData.global.main.nbsubwardscompleted[1].Date,*/}
                  {/*y: this.props.importedData.global.main.nbsubwardscompleted[1].TOTAL*/}
                  {/*},*/}
                  {/*{ x: this.props.importedData.global.main.nbsubwardscompleted[2].Date,*/}
                  {/*y: this.props.importedData.global.main.nbsubwardscompleted[2].TOTAL*/}
                  {/*},*/}
                  {/*{ x: this.props.importedData.global.main.nbsubwardscompleted[3].Date,*/}
                  {/*y: this.props.importedData.global.main.nbsubwardscompleted[3].TOTAL*/}
                  {/*}*/}
                  {/*]}*/}
                  {/*/>*/}
                  {/*</VictoryChart>}*/}
                  {/*/>*/}
                  {/*)}*/}
                  {/*</Grid>*/}
                </Grid>
              </MuiThemeProvider>
          )}
        </div>
    );
  }
}

export default CapacityBuildingContent;
