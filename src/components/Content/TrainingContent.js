/** Natives **/
import React, { Component } from 'react';

/** Logos **/
import trainingIMG   from '../../assets/logos/training.png';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid                                 from '@material-ui/core/Grid';

/** Components **/
import WidgetIndicator from '../Widgets/WidgetIndicator';


const GlobalTheme = createMuiTheme({
  typography: {
    fontSize   :  18,
    fontFamily : "'Barlow Condensed', sans-serif"
  },
})

class TrainingContent extends Component {

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
        <WidgetIndicator title="People trained" img={trainingIMG}  data={this.props.importedIndicators.totalMappers}/>
      </Grid>

    </Grid>
    </MuiThemeProvider>
  </div>
  );
 }
}

export default TrainingContent;
