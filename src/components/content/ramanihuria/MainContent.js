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
          <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
            <MuiThemeProvider theme={GlobalTheme}>

              {/* First row */}
              {/* Map edits */}
              <Grid item xs={12} sm={6} md={3}>
                {this.props.importedIndicators.ramanihuria && (<WidgetIndicator title="Map edits" img={mapIMG} data={this.props.importedIndicators.ramanihuria.main.edits}/>)}
              </Grid>

            </MuiThemeProvider>
          </Grid>
        </div>
    );
  }
}

export default MainContent;
