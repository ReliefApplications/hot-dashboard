/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './TrainingContent.css';

/** Logos **/
import trainingIMG   from '../../logos/training.png';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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

const font = "'Barlow Condensed', sans-serif";

const GlobalTheme = createMuiTheme({
  typography: {
    fontSize   :  18,
    fontFamily : font
  },
})

class TrainingContent extends Component {
  constructor (props) {
    super(props);

    this.state = {
      dataJSONfromAPI : [],  // JSON from Github API
      dataCSV         : [],  // CSV from  Github API
    }
  }

  //------------------------------------------------------------------------//
  //--------------------------------- Init ---------------------------------//
  //------------------------------------------------------------------------//

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


  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    return (
  <div>
    <MuiThemeProvider theme={GlobalTheme}>
    <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}

  {/* First row */}
      {/* People trained */}
      <Grid item xs={12} sm={6} md={3}>
        <WidgetIndicator title="People trained" img={trainingIMG}  data={this.state.dataJSONfromAPI.totalProjects}/>
      </Grid>

    </Grid>
    </MuiThemeProvider>
  </div>
  );
 }
}

export default TrainingContent;
