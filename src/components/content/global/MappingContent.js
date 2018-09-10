/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './MappingContent.css';

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
import { VictoryChart }  from 'victory';
import { VictoryBar   }  from 'victory';
import { VictoryAxis   }  from 'victory';
import { VictoryTooltip   }  from 'victory';

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
    const tableToData = function (data, customLabel) {
      let res = [];
      for (let i=data.length-1; i>=0; i--)
      {
        res.push({
          x: data[i].label,
          y: data[i].value,
          label: data[i].value + " " + customLabel
        })
      }
      return res;
    };

    return (
        // The padding prevent the page to be too wide because of the option spacing
        <div style={{ padding: 12 }}>
          {this.props.importedData.global &&
          (<MuiThemeProvider theme={GlobalTheme}>
                {/* First row */}
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
                  {/* Maps edits */}
                  <Grid item xs={12} sm={6} md={3}>
                    {this.props.importedData.global.mapping.totalEdits && (<WidgetIndicator title={this.props.importedData.global.mapping.totalEdits.title}
                                                                                         img={mapIMG}
                                                                                         data={this.props.importedData.global.mapping.totalEdits.data}/>)}
                  </Grid>
                </Grid>

                {/* Second row */}
                <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
                  {/* Mapped elements */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global.mapping.totalBuildings && (
                        <Card className="widget-container">
                          <CardContent className="widget-text">
                            <Typography variant="caption"> Number of elements mapped </Typography>
                            <div className="widget-mappedElements-text">
                              <Typography className="widget-mappedElements-text-item-green" color="primary">
                                {new Intl.NumberFormat('en-GB', {
                                  minimumFractionDigits : 0,
                                  maximumFractionDigits : 0
                                }).format(this.props.importedData.global.mapping.totalBuildings.data)} Buildings</Typography>
                              <Typography className="widget-mappedElements-text-item-grey">
                                {new Intl.NumberFormat('en-GB', {
                                  minimumFractionDigits : 0,
                                  maximumFractionDigits : 0
                                }).format(this.props.importedData.global.mapping.totalRoads.data)} Roads</Typography>
                            </div>
                          </CardContent>
                        </Card>)}
                  </Grid>

                  {/* Number of sub-wards complete */}
                  <Grid item xs={12} sm={6} md={4}>
                    {this.props.importedData.global.mapping.totalSubwardsCompleted &&
                    (<WidgetGraph title = {this.props.importedData.global.mapping.totalSubwardsCompleted.title}
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
                                        data   = {tableToData(this.props.importedData.global.mapping.totalSubwardsCompleted.data, "sub-wards completed")}
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
