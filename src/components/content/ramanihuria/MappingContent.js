/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './MappingContent.css';

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


class MappingContent extends Component {
  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    const nbSubwardsData = function (data) {
      let res = [];
      for (let i=data.length-1; i>=0; i--)
      {
        res.push({
          x: data[i].label,
          y: data[i].value,
          label: data[i].value + " sub-wards completed"
        })
      }
      return res;
    };

    return (
        <div style={{ padding: 12 }}>
          {this.props.importedData.ramanihuria &&
          (<MuiThemeProvider theme={GlobalTheme}>
                {/* First row */}
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
                  {/* Map edits */}
                  <Grid item xs={12} sm={6} md={3}>
                    {this.props.importedData.ramanihuria.mapping.edits && (<WidgetIndicator title={this.props.importedData.ramanihuria.mapping.edits.title}
                                                                                         img={mapIMG}
                                                                                         data={this.props.importedData.ramanihuria.mapping.edits.data}/>)}
                  </Grid>
                </Grid>

                {/* Second row */}
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
                  {/* Number of sub-wards complete */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.ramanihuria.mapping.nbSubwardsCompleted &&
                    (<WidgetGraph title = {this.props.importedData.ramanihuria.mapping.nbSubwardsCompleted.title}
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
                                        data   = {nbSubwardsData(this.props.importedData.ramanihuria.mapping.nbSubwardsCompleted.data)}
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

export default MappingContent;
