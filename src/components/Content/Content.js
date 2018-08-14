/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './Content.css';

/** Logos **/
import mapathonsIMG  from '../../logos/mapathons.svg';
import projectsIMG   from '../../logos/projects.svg';
import mapIMG        from '../../logos/map.svg';
import trainingIMG   from '../../logos/training.svg';

/** Material UI **/
import Typography     from '@material-ui/core/Typography';
import Card           from '@material-ui/core/Card';
import CardContent    from '@material-ui/core/CardContent';
import Grid           from '@material-ui/core/Grid';

/** Components **/
import WidgetIndicator from '../Widgets/WidgetIndicator';
import WidgetGraph     from '../Widgets/WidgetGraph';

/** Datas **/
import events         from '../../datas/CSV/events.csv'

/** Services **/
import JsonService  from '../../services/JsonService'

/** Plugins **/
import { VictoryPie   }  from 'victory';
import { VictoryChart }  from 'victory';
import { VictoryLine  }  from 'victory';
import { VictoryBar   }  from 'victory';
import      Papa         from 'papaparse';

const jsonService = new JsonService();


class Content extends Component {
  constructor (props) {
    super(props);

    this.state = {
      dataJSONfromAPI : [],  // JSON from Github API
      dataCSV         : [],  // CSV from  Github API
    }
  }

  /** Call datas from the GitHub api **/
   async componentDidMount(){
    const dataJson = await jsonService.getData();

    this.setState({
      dataJSONfromAPI: dataJson
    });
    console.log('data de lAPI content', this.state.dataJSONfromAPI)


    Papa.parse(events, {
    	complete: function(results) {
    		console.log("Finished:", results.data);
    	}
    });

    // fetch('https://drive.google.com/file/d/1BN4K55eKENyYFfwxPiQcb4tyx2lrJn8A/view?usp=sharing').

  }




  render() {
    return (
  <div>
    <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}

  {/* First row */}

       {/* Active projects */}
        <Grid item xs={12} sm={6} md={3}>
          <WidgetIndicator title="Active projects" img={projectsIMG}  data={this.state.dataJSONfromAPI.totalProjects}/>
        </Grid>

        {/* Map edits */}
        <Grid item xs={12} sm={6} md={3}>
          <WidgetIndicator title="Map edits" img={mapIMG} data={this.state.dataJSONfromAPI.totalRoads}/>
        </Grid>

        {/* Mapathons */}
        <Grid item xs={12} sm={6} md={3}>
          <WidgetIndicator title="Mapathons" img={mapathonsIMG} data={this.state.dataJSONfromAPI.totalMappers}/>
        </Grid>

        {/* People trained */}
        <Grid item xs={12} sm={6} md={3}>
          <WidgetIndicator title="People trained" img={trainingIMG}  data={this.state.dataJSONfromAPI.totalProjects}/>
        </Grid>

  {/* Second row */}

        {/* Mapped elements */}
        <Grid item xs={12}>
          <Card className="widget-container">
            <CardContent className="widget-text">
              <Typography variant="caption" className="widget-mappedElements-title"> Number of elements mapped </Typography>
              <div className="widget-mappedElements-text">
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
                                 data = {[
                                   { x: "Women", y: 41 },
                                   { x: "Men",   y: 59 },
                                 ]}
                               />}/>
        </Grid>

        {/* Usage of HOT Data */}
        <Grid item xs={12} sm={6} md={4}>
          <WidgetGraph title = "Increase of usage of HOT data"
                       data  = {this.state.dataJSONfromAPI.totalProjects}
                       graph = {<VictoryChart domainPadding={10}>
                                  <VictoryBar style={{ data: { fill: "#D73F3F" } }}/>
                                </VictoryChart>}/>
        </Grid>


        {/* Validataion errors */}
        <Grid item xs={12} sm={6} md={4}>
          <WidgetGraph title = "Proportion of validation errors"
                       data  = {this.state.dataJSONfromAPI.totalProjects}
                       graph = {<VictoryChart>
                                 <VictoryLine
                                   style={{
                                     data   : { stroke: "#2C3038" },
                                     parent : { border: "1px solid #ccc"}
                                   }}
                                   data = {[
                                     { x: 1, y: 2 },
                                     { x: 2, y: 3 },
                                     { x: 3, y: 5 },
                                     { x: 4, y: 4 },
                                     { x: 5, y: 7 }
                                   ]}
                                 />
                               </VictoryChart>}/>

        </Grid>

      </Grid>
    </div>
    );
  }
}

export default Content;
