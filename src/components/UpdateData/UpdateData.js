/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './UpdateData.css';

/** Logos **/
import mapathonsIMG  from '../../logos/mapathons.png';
import projectsIMG   from '../../logos/projects.png';
import mapIMG        from '../../logos/map.png';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Typography       from '@material-ui/core/Typography';
import Card             from '@material-ui/core/Card';
import CardContent      from '@material-ui/core/CardContent';
import Grid             from '@material-ui/core/Grid';

/** Components **/
import WidgetIndicator from '../Widgets/WidgetIndicator';
import WidgetGraph     from '../Widgets/WidgetGraph';

/** Constants **/
import * as constants from '../../datas/Constants'

/** Services **/
import JsonService  from '../../services/JsonService';
import CsvService   from '../../services/CsvService';

/** Services calling **/
const jsonService = new JsonService();
const csvService  = new CsvService();

/** Themes **/
const font     = "'Barlow Condensed', sans-serif";
const fontSize = 18;

class UpdateData extends Component {
  constructor (props) {
    super(props);
    //this.updateDataDashboards = this.updateDataDashboards.bind(this);
    console.log('UpdateData constructor');
    this.state = {
      updateAPIs : false
    }
  } //constructor


  //------------------------------------------------------------------------//
  //--------------------------------- Init ---------------------------------//
  //------------------------------------------------------------------------//
  updateDataDashboards() {
    console.log('Estoy en update data dashboards');
  }

  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//
  render() {
    return (
      <div>
      ppppppppppppppppp
      </div>
    );
  }
}
export default UpdateData;
