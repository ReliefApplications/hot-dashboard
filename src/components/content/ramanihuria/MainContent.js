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
          {this.props.importedData &&
          (<MuiThemeProvider theme={GlobalTheme}>
            <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}

              {/* First row */}
              {/* Map edits */}
              <Grid item xs={12} sm={6} md={3}>
                {this.props.importedData.ramanihuria && (<WidgetIndicator title="Map edits" img={mapIMG} data={this.props.importedData.ramanihuria.main.edits}/>)}
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
            </Grid>
          </MuiThemeProvider>
          )}
        </div>
    );
  }
}

export default MainContent;
