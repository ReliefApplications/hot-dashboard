/** Natives **/
import React, { Component } from 'react';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid            from '@material-ui/core/Grid';
import Button          from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
})

class UpdateDataContent extends Component {

  render() {

    return (
  <div>
    <MuiThemeProvider theme={GlobalTheme}>

      {/* Update Data button */}
      <div className="update-data-button">
        <Button variant="contained" component="span" color="primary">
          Upload
          <CloudUploadIcon className="update-data-button-icon"/>
        </Button>
      </div>


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

export default UpdateDataContent;
