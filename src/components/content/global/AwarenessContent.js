/** Natives **/
import React, { Component } from 'react';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

/** Styles **/
const GlobalTheme = createMuiTheme({
  typography: {
    fontSize   :  18,
    fontFamily : "'Barlow Condensed', sans-serif"
  },
  palette: {
    primary: {
      main : '#D73F3F',
    }
  },
});

class CapacityBuildingContent extends Component {
  render() {

    return (
        // The padding prevent the page to be too wide because of the option spacing
        <div style={{ padding: 12 }}>
          <MuiThemeProvider theme={GlobalTheme}>

            <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
              {/* First row */}
              <Grid item xs={12} sm={6} md={3}>
              </Grid>
            </Grid>

          </MuiThemeProvider>
        </div>
    );
  }
}

export default CapacityBuildingContent;