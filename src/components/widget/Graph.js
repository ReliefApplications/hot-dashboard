/** Natives **/
import React, { Component } from 'react';

/** Material UI **/
import Typography     from '@material-ui/core/Typography';
import Card           from '@material-ui/core/Card';
import CardContent    from '@material-ui/core/CardContent';


class Graph extends Component {
  render() {

    return (
      <div>
        <Card className="widget-container">
          <CardContent className="widget-text">
            <Typography variant="caption"> {this.props.title} </Typography>
              {this.props.graph}
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Graph;
