/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './AwarenessContent.css';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid             from '@material-ui/core/Grid';

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


class AwarenessContent extends Component {
  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    return (
        // The padding prevent the page to be too wide because of the option spacing
        <div style={{ padding: 12 }}>
          {this.props.importedData &&
          (<MuiThemeProvider theme={GlobalTheme}>
            <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}

              {/* First row */}
              <Grid item>
              </Grid>
            </Grid>
          </MuiThemeProvider>
          )}
        </div>
    );
  }
}

export default AwarenessContent;
