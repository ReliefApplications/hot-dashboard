/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './MainContent.css';

/** Logos **/
import mapathonsIMG  from '../../../assets/images/logos/mapathons.png';
import projectsIMG   from '../../../assets/images/logos/projects.png';
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

/** Constants **/
import * as constants from '../../../core/external/Constants'

/** Services **/
import JsonService  from '../../../core/utils/reader/JsonService';
import CsvService   from '../../../core/utils/reader/CsvService';

/** Plugins **/
import { VictoryPie   }  from 'victory';
import { VictoryChart }  from 'victory';
import { VictoryLine  }  from 'victory';
import { VictoryBar   }  from 'victory';


/** Services calling **/
const jsonService = new JsonService();
const csvService  = new CsvService();


/** Themes **/
const font     = "'Barlow Condensed', sans-serif";
const fontSize = 18;

const GlobalTheme = createMuiTheme({
  typography: {
    fontSize   :  fontSize,
    fontFamily : font
  },
});

const MappedElementTheme = createMuiTheme({
  typography: {
    fontSize   :  fontSize,
    fontFamily : font,
    color: 'white'
  },
});



class MainContent extends Component {
  constructor (props) {
    super(props);
    this.updateCSV = this.updateCSV.bind(this);

    this.state = {
      dataJSONfromAPI : [],  // JSON from Github API
      dataCSVfromAPI  : [],  // CSV from Github API

      hotData2014    : [],
      hotData2015    : [],
      hotData2016    : [],
      hotData2017    : [],
      hotData2018    : [],
    }
  }


  //------------------------------------------------------------------------//
  //--------------------------------- Init ---------------------------------//
  //------------------------------------------------------------------------//

  /** Call datas from the GitHub api **/
   async componentDidMount(){

    // Get JSON from JsonService
    const dataJson = await jsonService.getData(constants.jsonAggregatedStats);
    this.setState({
      dataJSONfromAPI: dataJson
    });
    console.log('data de lAPI json', this.state.dataJSONfromAPI)

    // Get CSV from CsvService
    csvService.getData(constants.csvEvents, this.updateCSV);
  }



  updateCSV(result) {
    const data = result.data;

    this.setState({
      dataCSVfromAPI: data
    });
    console.log('dataCSVfromAPI dans updateCSV', this.state.dataCSVfromAPI)

    var getYearPattern = (year) => {
      return new RegExp(year+'-([0-9]{2})-([0-9]{2})');   // English date format
      // return new RegExp('([0-9]{2})/[0-9]{2}/'+year); // French date format
    };

    const numberOf2014 = this.state.dataCSVfromAPI
    .filter(row => row.date && row.date.match(getYearPattern(2014))).length;

    const numberOf2015 = this.state.dataCSVfromAPI
    .filter(row => row.date && row.date.match(getYearPattern(2015))).length;

    const numberOf2016 = this.state.dataCSVfromAPI
    .filter(row => row.date && row.date.match(getYearPattern(2016))).length;

    const numberOf2017 = this.state.dataCSVfromAPI
    .filter(row => row.date && row.date.match(getYearPattern(2017))).length;

    const numberOf2018 = this.state.dataCSVfromAPI
    .filter(row => row.date && row.date.match(getYearPattern(2018))).length;

    this.setState({
      hotData2014: numberOf2014,
      hotData2015: numberOf2015,
      hotData2016: numberOf2016,
      hotData2017: numberOf2017,
      hotData2018: numberOf2018,
    });
  }


  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    return (
  <div>
    <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
    <MuiThemeProvider theme={GlobalTheme}>

  {/* First row */}

       {/* Active projects */}
        <Grid item xs={12} sm={6} md={3}>
          <WidgetIndicator title="Active projects" img={projectsIMG}  data={this.state.dataJSONfromAPI.totalProjects}/>
        </Grid>

        {/* Map edits */}
        <Grid item xs={12} sm={6} md={3}>
          <WidgetIndicator title="Map edits" img={mapIMG} data={this.state.dataJSONfromAPI.totalMappers}/>
        </Grid>

        {/* Mapathons */}
        <Grid item xs={12} sm={6} md={3}>
          <WidgetIndicator title="Mapathons" img={mapathonsIMG} data={this.state.dataCSVfromAPI.length}/>
        </Grid>

  {/* Second row */}

        {/* Mapped elements */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className="widget-container">
            <CardContent className="widget-text">
              <Typography variant="caption" className="widget-mappedElements-title"> Number of elements mapped </Typography>
              <div className="widget-mappedElements-text">
              <MuiThemeProvider theme={MappedElementTheme}>
                <Typography color="textSecondary" className="widget-mappedElements-text-item-green">
                  {new Intl.NumberFormat('en-GB', {
                     minimumFractionDigits : 0,
                     maximumFractionDigits : 0
                  }).format(this.state.dataJSONfromAPI.totalBuildings)} Buildings</Typography>
                <Typography className="widget-mappedElements-text-item-grey">
                  {new Intl.NumberFormat('en-GB', {
                     minimumFractionDigits : 0,
                     maximumFractionDigits : 0
                   }).format(this.state.dataJSONfromAPI.totalRoads)} Roads</Typography>
                   </MuiThemeProvider>
              </div>
            </CardContent>
          </Card>
        </Grid>

  {/* Third row */}

        {/* Community mappers */}
        <Grid item xs={12} sm={6} md={4}>
          <WidgetGraph title = "Number of community mappers (by sex)"
                       data  = {126}
                       graph = {<VictoryPie
                                 padAngle    = {2}
                                 innerRadius = {100}
                                 width       = {450}
                                 colorScale  = {[ "#FAA71E", "#D73F3F"]}
                                 style={{ labels: {fontSize: 18} }}
                                 data = {[
                                   { x: "Women", y: 41 },
                                   { x: "Men",   y: 59 },
                                 ]}
                               />}/>
        </Grid>

        {/* Usage of HOT Data */}
        <Grid item xs={12} sm={6} md={4}>
          <WidgetGraph title = "Increase of usage of HOT data"
                       graph = {<VictoryChart domainPadding={10}>
                                  <VictoryBar style  = {{ data: { fill: "#D73F3F" } }}
                                              data   = {[
                                                { x: '2014', y: 0, y0: this.state.hotData2014 },
                                                { x: '2015', y: 0, y0: this.state.hotData2015 },
                                                { x: '2016', y: 0, y0: this.state.hotData2016 },
                                                { x: '2017', y: 0, y0: this.state.hotData2017 },
                                                { x: '2018', y: 0, y0: this.state.hotData2018 }
                                                ]}
                                  />
                                </VictoryChart>}/>
        </Grid>


        {/* Validataion errors */}
        <Grid item xs={12} sm={6} md={4}>
          <WidgetGraph title = "Proportion of validation errors"
                       graph = {<VictoryChart>
                                 <VictoryLine
                                   style={{
                                     data   : { stroke: "#2C3038" },
                                     parent : { border: "1px solid #ccc"}
                                   }}
                                   data = {[
                                     { x: '2014', y: this.state.hotData2014 },
                                     { x: '2015', y: this.state.hotData2015 },
                                     { x: '2016', y: this.state.hotData2016 },
                                     { x: '2017', y: this.state.hotData2017 },
                                     { x: '2018', y: this.state.hotData2018 }
                                   ]}
                                 />
                               </VictoryChart>}/>

        </Grid>

        </MuiThemeProvider>
      </Grid>
    </div>
    );
  }
}

export default MainContent;
