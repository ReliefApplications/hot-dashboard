/** Natives **/
import React, { Component } from 'react';

/** CSS **/
import './MainContent.css';

/** Logos **/
import mapathonsIMG  from '../../../assets/images/logos/mapathons.png';
import mapIMG        from '../../../assets/images/logos/map.png';

/** Material UI **/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

/** Components **/
import WidgetIndicator from '../../widget/Indicator';

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

class MappingCommunityContent extends Component {
  render() {

    return (
        // The padding prevent the page to be too wide because of the option spacing
        <div style={{ padding: 12 }}>
          {this.props.importedData &&
          (<MuiThemeProvider theme={GlobalTheme}>
            {/* First row */}
            <Grid container spacing={24} className="content-row">  {/* Spacing = space between cards */}
              {/* Total mappers */}
              <Grid item xs={12} sm={6} md={3}>
                {this.props.importedData.global.mappingcommunity.totalMappers && (<WidgetIndicator title={this.props.importedData.global.mappingcommunity.totalMappers.title}
                                                                                       img={mapIMG}
                                                                                       data={this.props.importedData.global.mappingcommunity.totalMappers.data}/>)}
              </Grid>

              {/* Mapathons */}
              <Grid item xs={12} sm={6} md={3}>
                {this.props.importedData.global.main.totalMapathons && (<WidgetIndicator title={this.props.importedData.global.main.totalMapathons.title}
                                                                                         img={mapathonsIMG}
                                                                                         data={this.props.importedData.global.main.totalMapathons.data}/>)}
              </Grid>
            </Grid>
          </MuiThemeProvider>)}
        </div>
    );
  }
}

export default MappingCommunityContent;