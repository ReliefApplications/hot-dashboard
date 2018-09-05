/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './MainContent.css';

/** Logos **/
import mapIMG        from '../../../assets/images/logos/map.png';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography       from '@material-ui/core/Typography';
import Card             from '@material-ui/core/Card';
import CardContent      from '@material-ui/core/CardContent';
import Grid             from '@material-ui/core/Grid';

/** Components **/
import WidgetIndicator from '../../widget/Indicator';
import WidgetGraph     from '../../widget/Graph';

/** Plugins **/
import { VictoryPie   }  from 'victory';
import { VictoryChart }  from 'victory';
import { VictoryLine  }  from 'victory';
import { VictoryBar   }  from 'victory';
import { VictoryAxis   }  from 'victory';
import { VictoryTooltip   }  from 'victory';
import { VictoryStack   }  from 'victory';
import { VictoryGroup   }  from 'victory';
import { VictoryScatter   }  from 'victory';

/** Themes **/
const GlobalTheme = createMuiTheme({
  typography: {
    fontSize   :  18,
    fontFamily : "'Barlow Condensed', sans-serif"
  },
  palette: {
    primary: {
      main : '#FFFFFF',
    }
  },
});


class MainContent extends Component {
  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    return (
        // The padding prevent the page to be too wide because of the option spacing
        <div style={{ padding: 12 }}>
          {/* We only show the dashboard if the matching data fetched from the rawdata is existing */}
          {this.props.importedData.global &&
          (<MuiThemeProvider theme={GlobalTheme}>
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}

                  {/* First row */}
                  {/* A widdgetIndicator can be used to show a little image and a value */}
                  <Grid item xs={12} sm={6} md={3}> {/* item of the container that uses bootstrap breakpoints */}
                    {/* We check again if the data displayed in the widget does exist. Then, we add the widget */}
                    {this.props.importedData && (<WidgetIndicator title="This is a 'WidgetIndicator'" //The title is the text displayed above the data
                                                                  img={mapIMG} //The image displayed on the left of the widget
                                                                  data={200}/>)} {/* The data is the value */}
                    {/* {this.props.importedData.global.main.totalProjects && (<WidgetIndicator title={this.props.importedData.global.main.totalProjects.title}*/}
                    {/*img={projectsIMG}*/}
                    {/*data={this.props.importedData.global.main.totalProjects.data}/>)}*/}
                  </Grid>

                  {/* Bar diagram example */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global.capacitybuilding.attendeesAndInstitutions &&
                    (<WidgetGraph title = "Bar diagram example"
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
                                          { x: "Jan 2015",
                                            y: 12,
                                            label: 12 + " institutions trained"
                                          },
                                          { x: "Apr 2015",
                                            y: 11,
                                            label: 11 + " institutions trained"
                                          },
                                          { x: "May 2018",
                                            y: 42,
                                            label: 42 + " institutions trained"
                                          },
                                          { x: "Aug 2018",
                                            y: 58,
                                            label: 58 + " institutions trained"
                                          },
                                        ]}
                                    />}
                                  </VictoryChart>
                                  }/>

                    )}
                    {/*{this.props.importedData.global.capacitybuilding.attendeesAndInstitutions &&*/}
                    {/*(<WidgetGraph title = {this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.titleInstitutions}*/}
                                  {/*graph = {<VictoryChart domainPadding={15}>*/}
                                    {/*<VictoryAxis*/}
                                        {/*style={{ tickLabels: { padding: 20, angle: -0 } }}*/}
                                    {/*/>*/}
                                    {/*<VictoryAxis*/}
                                        {/*dependentAxis*/}
                                    {/*/>*/}
                                    {/*{<VictoryBar*/}
                                        {/*labelComponent={<VictoryTooltip/>}*/}
                                        {/*style  = {{ data: { fill: "#D73F3F" } }}*/}
                                        {/*data   = {[*/}
                                          {/*{ x: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[0].label,*/}
                                            {/*y: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[0].nbInstitutions,*/}
                                            {/*label: this.props.importedData.global.capacitybuilding.attendeesAndInstitutions.data[0].nbInstitutions + " institutions trained"*/}
                                          {/*},*/}
                                        {/*]}*/}
                                    {/*/>}*/}
                                  {/*</VictoryChart>*/}
                                  {/*}/>*/}
                    {/*)}*/}
                  </Grid>

                  {/* Custom widget */}
                  <Grid item xs={12} sm={6} md={3}>
                    {this.props.importedData.global.main.totalBuildings && (
                        <Card className="widget-container">
                          <CardContent className="widget-text">
                            <Typography variant="caption"> Custom widget </Typography>
                            <div className="widget-mappedElements-text">
                              <Typography className="widget-mappedElements-text-item-green" color="primary">
                                {new Intl.NumberFormat('en-GB', {
                                  minimumFractionDigits : 0,
                                  maximumFractionDigits : 0
                                }).format(this.props.importedData.global.main.totalBuildings.data)} Buildings</Typography>
                              <Typography className="widget-mappedElements-text-item-grey">
                                {new Intl.NumberFormat('en-GB', {
                                  minimumFractionDigits : 0,
                                  maximumFractionDigits : 0
                                }).format(this.props.importedData.global.main.totalRoads.data)} Roads</Typography>
                            </div>
                          </CardContent>
                        </Card>)}
                  </Grid>

                  {/* Double bar chart example */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.ramanihuria &&
                    (<WidgetGraph title = "Double bar chart example"
                                  graph = {<VictoryChart domainPadding={15}>
                                    <VictoryGroup offset={20} style={{ data: { width: 15 } }}>
                                      <VictoryStack colorScale={"red"}>
                                        {<VictoryBar
                                            labelComponent={<VictoryTooltip/>}
                                            style  = {{ data: { fill: "#D73F3F" } }}
                                            data   = {[
                                              { x: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[0].label,
                                                y: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[0].nbAttendees,
                                                label: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[0].nbAttendees + " people trained"
                                              },
                                            ]}
                                        />}
                                      </VictoryStack>
                                      <VictoryStack colorScale={"green"}>
                                        {<VictoryBar
                                            labelComponent={<VictoryTooltip/>}
                                            style  = {{ data: { fill: "#" } }}
                                            data   = {[
                                              { x: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[0].label,
                                                y: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[0].nbInstitutions,
                                                label: this.props.importedData.ramanihuria.capacitybuilding.attendeesAndInstitutions.data[0].nbInstitutions + " institutions trained"
                                              },
                                            ]}
                                        />}
                                      </VictoryStack>
                                    </VictoryGroup>
                                  </VictoryChart>
                                  }/>

                    )}
                  </Grid>

                  {/* Line chart example */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global &&
                    (<WidgetGraph title = "Line chart example"
                                  graph = {<VictoryChart domainPadding={15}>
                                    <VictoryLine
                                        style={{
                                          data   : { stroke: "#2C3038" },
                                          parent : { border: "1px solid #ccc"}
                                        }}
                                        data = {[
                                          { x: '2014', y: this.props.importedData.global.main.usageOfHotData.data2014 },
                                          { x: '2015', y: this.props.importedData.global.main.usageOfHotData.data2015 },
                                          { x: '2016', y: this.props.importedData.global.main.usageOfHotData.data2016 },
                                          { x: '2017', y: this.props.importedData.global.main.usageOfHotData.data2017 },
                                          { x: '2018', y: this.props.importedData.global.main.usageOfHotData.data2018 }
                                        ]}
                                    />
                                  </VictoryChart>}/>
                    )}
                  </Grid>

                  {/* Pie chart example */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global && (
                        <WidgetGraph title = "Pie chart example"
                                     graph = {<VictoryPie
                                         padAngle    = {2}
                                         innerRadius = {100}
                                         width       = {475}
                                         colorScale  = {[ "#FAA71E", "#D73F3F"]}
                                         style={{ labels: {fontSize: 18} }}
                                         data = {[
                                           { x: "Women", y: 51 },
                                           { x: "Men",   y: 49 },
                                         ]}
                                     />}/>)}
                  </Grid>

                  {/* Scatter plot example */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global && (
                        <WidgetGraph title = "Scatter plot example"
                                     graph = {<VictoryChart domainPadding={15}>
                                       <VictoryScatter
                                           style={{ data: { fill: "#D73F3F" } }}
                                           size={4}
                                           data={[
                                             { x: '2014', y: this.props.importedData.global.main.usageOfHotData.data2014 },
                                             { x: '2015', y: this.props.importedData.global.main.usageOfHotData.data2015 },
                                             { x: '2016', y: this.props.importedData.global.main.usageOfHotData.data2016 },
                                             { x: '2017', y: this.props.importedData.global.main.usageOfHotData.data2017 },
                                             { x: '2018', y: this.props.importedData.global.main.usageOfHotData.data2018 }
                                           ]}
                                       />
                                     </VictoryChart>}/>)}
                  </Grid>
                </Grid>
              </MuiThemeProvider>
          )}
        </div>
    );
  }
}

export default MainContent;
