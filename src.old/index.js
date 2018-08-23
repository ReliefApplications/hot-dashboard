/** Natives **/
import React                 from 'react';
import ReactDOM              from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

/** Containers **/
import Home                  from './containers/Home/Home';

/** CSS **/
import './index.css';

ReactDOM.render(<Home />, document.getElementById('root'));
registerServiceWorker();
