/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './MainContent.css';

/** Logos **/
import mapIMG        from '../../../assets/images/logos/map.png';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid             from '@material-ui/core/Grid';

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
        <div style={{ padding: 12 }}>
          {this.props.importedData.ramanihuria &&
          (<MuiThemeProvider theme={GlobalTheme}>
            <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}

              {/* First row */}
              {/* Map edits */}
              <Grid item xs={12} sm={6} md={3}>
                {this.props.importedData.ramanihuria.main.edits && (<WidgetIndicator title={this.props.importedData.ramanihuria.main.edits.title}
                                                                          img={mapIMG}
                                                                          data={this.props.importedData.ramanihuria.main.edits.data}/>)}
              </Grid>

              {/* Number of sub-wards complete */}
              <Grid item xs={12} sm={6} md={4}>
                {this.props.importedData.ramanihuria.main.nbsubwardscompleted &&
                (<WidgetGraph title = {this.props.importedData.ramanihuria.main.nbsubwardscompleted.title}
                              graph = {<VictoryChart domainPadding={15}>
                                <VictoryAxis
                                    style={{ tickLabels: { padding: 20, angle: -0 } }}
                                />
                                <VictoryAxis
                                    dependentAxis
                                />
                                <VictoryBar
                                    labelComponent={<VictoryTooltip/>}
                                    style  = {{ data: { fill: "#D73F3F" } }}
                                    data   = {[
                                      { x: this.props.importedData.ramanihuria.main.nbsubwardscompleted.data[0].Date,
                                        y: this.props.importedData.ramanihuria.main.nbsubwardscompleted.data[0].TOTAL,
                                        label: this.props.importedData.ramanihuria.main.nbsubwardscompleted.data[0].TOTAL + " sub-wards completed"
                                      },
                                      { x: this.props.importedData.ramanihuria.main.nbsubwardscompleted.data[1].Date,
                                        y: this.props.importedData.ramanihuria.main.nbsubwardscompleted.data[1].TOTAL,
                                        label: this.props.importedData.ramanihuria.main.nbsubwardscompleted.data[1].TOTAL + " sub-wards completed"
                                      },
                                      { x: this.props.importedData.ramanihuria.main.nbsubwardscompleted.data[2].Date,
                                        y: this.props.importedData.ramanihuria.main.nbsubwardscompleted.data[2].TOTAL,
                                        label: this.props.importedData.ramanihuria.main.nbsubwardscompleted.data[2].TOTAL + " sub-wards completed"
                                      },
                                      { x: this.props.importedData.ramanihuria.main.nbsubwardscompleted.data[3].Date,
                                        y: this.props.importedData.ramanihuria.main.nbsubwardscompleted.data[3].TOTAL,
                                        label: this.props.importedData.ramanihuria.main.nbsubwardscompleted.data[3].TOTAL + " sub-wards completed"
                                      }
                                    ]}
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

export default MainContent;
