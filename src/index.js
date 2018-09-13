/** Natives **/
import React                 from 'react';
import ReactDOM              from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

/** Containers **/
import Home                  from './containers/home/Home';

/** CSS **/
import './index.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const GlobalTheme = createMuiTheme({
  typography: {
    fontSize   :  18,
    fontFamily : "'Barlow Condensed', sans-serif"
  },
  overrides: {
    MuiCardHeader: {
      title: {
        fontSize: '1.5rem',
        color: "rgba(0, 0, 0, 0.54)",
        margin: 0,
      },
    },
    MuiTypography: {
      colorPrimary: {
        color: 'white',
      }
    }
  },
});

ReactDOM.render(
    <MuiThemeProvider theme={GlobalTheme}>
      <Home />
    </MuiThemeProvider>,
    document.getElementById('root'));
registerServiceWorker();
