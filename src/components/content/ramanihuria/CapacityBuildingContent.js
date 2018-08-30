/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './CapacityBuildingContent.css';

/** Logos **/
import trainingIMG   from '../../../assets/images/logos/training.png';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid           from '@material-ui/core/Grid';

/** Components **/
import WidgetIndicator from '../../widget/Indicator';
import WidgetGraph from "../../widget/Graph";

/** Plugins **/
import { VictoryPie   }  from 'victory';
import { VictoryChart }  from 'victory';
import { VictoryLine   }  from 'victory';
import { VictoryAxis  }  from 'victory';

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
          <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
            <MuiThemeProvider theme={GlobalTheme}>

              {/* First row */}
              {/* People trained */}
              <Grid item xs={12} sm={6} md={3} className="grid-item">
                <WidgetIndicator title="People trained" img={trainingIMG}  data={this.props.importedIndicators.ramanihuria.capacitybuilding.trainings.total}/>
              </Grid>

              {/*Fill the gap to have another row of widget for the big ones*/}
              {/*<Grid item xs={0} sm={6} md={9} className="grid-item">*/}
              {/*</Grid>*/}

              {/* Monthly training */}
              <Grid item xs={12} sm={6} md={4}>
                {this.props.importedIndicators.global &&
                (<WidgetGraph title = {this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.title}
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
                                              // { x: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data1"].label,
                                              //   y: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data1"].value
                                              // },
                                              // { x: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data2"].label,
                                              //   y: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data2"].value
                                              // },
                                              // { x: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data3"].label,
                                              //   y: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data3"].value
                                              // },
                                              // { x: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data4"].label,
                                              //   y: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data4"].value
                                              // },
                                              // { x: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data5"].label,
                                              //   y: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data5"].value
                                              // },
                                              // { x: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data6"].label,                                                y: 0,
                                              //   y: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data6"].value
                                              // },
                                              { x: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data7"].label,
                                                y: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data7"].value
                                              },
                                              { x: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data8"].label,
                                                y: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data8"].value
                                              },
                                              { x: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data9"].label,
                                                y: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data9"].value
                                              },
                                              { x: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data10"].label,
                                                y: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data10"].value
                                              },
                                              { x: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data11"].label,
                                                y: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data11"].value
                                              },
                                              { x: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data12"].label,
                                                y: this.props.importedIndicators.ramanihuria.capacitybuilding.monthlyDivision.data["data12"].value
                                              }
                                            ]}
                                />
                              </VictoryChart>}/>
                )}
              </Grid>

              {/* Training by genders */}
              <Grid item xs={12} sm={6} md={4}>
                {this.props.importedIndicators.global && (
                    <WidgetGraph title = "Trainings (by gender)"
                                 graph = {<VictoryPie
                                     padAngle    = {2}
                                     innerRadius = {100}
                                     width       = {475}
                                     colorScale  = {[ "#FAA71E", "#D73F3F"]}
                                     style={{ labels: {fontSize: 18} }}
                                     data = {[
                                       { x: "Women", y: this.props.importedIndicators.ramanihuria.capacitybuilding.trainings.women },
                                       { x: "Men",   y: this.props.importedIndicators.ramanihuria.capacitybuilding.trainings.men },
                                     ]}
                                 />}/>)}
              </Grid>

            </MuiThemeProvider>
          </Grid>
        </div>
    );
  }
}

export default CapacityBuildingContent;
