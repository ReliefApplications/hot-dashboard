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
          {this.props.importedData &&
          (<MuiThemeProvider theme={GlobalTheme}>
            {/* First row */}
            <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
            </Grid>
          </MuiThemeProvider>)}
        </div>
    );
  }
}

export default CapacityBuildingContent;