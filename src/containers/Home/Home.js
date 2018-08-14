/** Natives **/
import React from 'react';

/** Containers **/
import Header    from '../../components/Header/Header'
import Content   from '../../components/Content/Content'

/** CSS **/
import './Home.css';

/** Material **/
import { withStyles }  from '@material-ui/core/styles';
import PropTypes       from 'prop-types';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List            from '@material-ui/core/List';
import Divider         from '@material-ui/core/Divider';
import Button          from '@material-ui/core/Button';

const styles = {
  list: {
    width: 250,
  },
};

class Home extends React.Component {

  state = {
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };


render() {
  const { classes } = this.props;

{/* Items Menu list  */}
  const sideList = (
     <div className={classes.list}>
       <List>"pop"</List>
       <Divider />
       <List>"pop"</List>
     </div>
   );


    return (
      <div className="Home">

      {/* Header */}
        <Header></Header>

      {/* Button test SideMenu (to delete) */}
      {/*  <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button> */}

      {/* SideMenu */}
        <SwipeableDrawer
          anchor  = "right"
          open    = {this.state.right}
          onClose = {this.toggleDrawer('right', false)}
          onOpen  = {this.toggleDrawer('right', true)}>

          <div
            tabIndex={0}
            role      = "button"
            onClick   = {this.toggleDrawer('right', false)}
            onKeyDown = {this.toggleDrawer('right', false)}>

            {sideList}
          </div>
        </SwipeableDrawer>


      {/* content items */}
        <Content></Content>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
