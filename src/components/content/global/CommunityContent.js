/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './MappingContent.css';

/** Logos **/
import mapathonsIMG  from '../../../assets/images/logos/mapathons.png';
import mapIMG        from '../../../assets/images/logos/map.png';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

/** Components **/
import WidgetIndicator from '../../widget/Indicator';
import WidgetGraph from "../../widget/Graph";

/** Plugins **/
import { VictoryChart }  from 'victory';
import { VictoryAxis  }  from 'victory';
import { VictoryBar  }  from 'victory';
import { VictoryTooltip }  from 'victory';
import { VictoryStack }  from 'victory';

/** Styles **/
const GlobalTheme = createMuiTheme({
  typography: {
    fontSize   :  18,
    fontFamily : "'Barlow Condensed', sans-serif"
  },
  palette: {
    primary: {
      main : '#D73F3F',
    }
  },
});

class CommunityContent extends Component {
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
            {/* Total mappers */}
            <Grid item xs={12} sm={6} md={3}>
              {this.props.importedData.global.community.totalMappers && (<WidgetIndicator title={this.props.importedData.global.community.totalMappers.title}
                                                                                          img={mapIMG}
                                                                                          data={this.props.importedData.global.community.totalMappers.data}/>)}
            </Grid>

            {/* Mapathons */}
            <Grid item xs={12} sm={6} md={3}>
              {/* We're using the totalEvents value because each event is a mapathon so the total number is the length of the list */}
              {this.props.importedData.global.community.totalEvents && (<WidgetIndicator title={this.props.importedData.global.community.totalEvents.title}
                                                                                         img={mapathonsIMG}
                                                                                         data={this.props.importedData.global.community.totalEvents.data.length}/>)}
            </Grid>
          </Grid>

          {/* Second row */}
          <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
            {/* Number of people participating in an event (gender) */}
            <Grid item xs={12} sm={6} md={4}>
              {this.props.importedData.global.community.totalNbParticipantsGender &&
              (<WidgetGraph title = {this.props.importedData.global.community.totalNbParticipantsGender.title}
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
                                    data   = {tableToData(this.props.importedData.global.community.totalNbParticipantsGender.data, "women participants", "female")}
                                />
                                <VictoryBar
                                    labelComponent={<VictoryTooltip/>}
                                    style  = {{ data: { fill: "#FAA71E" } }}
                                    data   = {tableToData(this.props.importedData.global.community.totalNbParticipantsGender.data, "men participants", "male")}
                                />
                              </VictoryStack>
                            </VictoryChart>
                            }/>
              )}
            </Grid>

            {/* Number of people participating in an event (new/old) */}
            <Grid item xs={12} sm={6} md={4}>
              {this.props.importedData.global.community.totalNbParticipantsNew &&
              (<WidgetGraph title = {this.props.importedData.global.community.totalNbParticipantsNew.title}
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
                                    data   = {tableToData(this.props.importedData.global.community.totalNbParticipantsNew.data, "new participants", "new")}
                                />
                                <VictoryBar
                                    labelComponent={<VictoryTooltip/>}
                                    style  = {{ data: { fill: "#FAA71E" } }}
                                    data   = {tableToData(this.props.importedData.global.community.totalNbParticipantsNew.data, "old participants", "old")}
                                />
                              </VictoryStack>
                            </VictoryChart>
                            }/>
              )}
            </Grid>
          </Grid>
        </MuiThemeProvider>)}
      </div>
    );
  }
}

export default CommunityContent;