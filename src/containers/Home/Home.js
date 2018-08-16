/** Natives **/
import React from 'react';

/** Containers **/
import Header          from '../../components/Header/Header'
import MainContent     from '../../components/MainContent/MainContent'
import TrainingContent from '../../components/TrainingContent/TrainingContent'

/** CSS **/
import './Home.css';

/** Material **/
import { withStyles }  from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List            from '@material-ui/core/List';
import Divider         from '@material-ui/core/Divider';
import PropTypes       from 'prop-types';

const styles = {
  list: {
    width: 200,
  },
};

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.openMenu = this.openMenu.bind(this);
  }

  state = {
    menuLeft                : false, // State of the left menu.
    MainContentSelected     : true,  // When Main Content is selected
    TrainingContentSelected : false, // When Training Content is selected
  };


  //------------------------------------------------------------------------//
  //---------------------------------- Menu --------------------------------//
  //------------------------------------------------------------------------//

  /** To open the Menu from the Header child component **/
  openMenu(openORclose){
    this.setState({
      menuLeft: openORclose,
    });
  }

  /** To close the Menu **/
  closeMenu = (open) => () => {
    this.setState({
      menuLeft: open,
    });
  };

  //------------------------------------------------------------------------//
  //----------------------------- Menu Contents ----------------------------//
  //------------------------------------------------------------------------//

  /** To show the Main Content **/
  openMainContent = (open) => () => {
    this.setState({
      MainContentSelected     : open,
      TrainingContentSelected : false
    });
  };

  /** To show the Training Content **/
  openTrainingContent = (open) => () => {
    this.setState({
      TrainingContentSelected : open,
      MainContentSelected     : false
    });
  };

  //------------------------------------------------------------------------//
  //-------------------------------- Render --------------------------------//
  //------------------------------------------------------------------------//

  render() {
    const { classes } = this.props;

  {/* Items Menu list  */}
    const sideList = (
       <div className={classes.list}>
         <List className="listMenu-item" onClick = {this.openMainContent(true)}>Main</List>
         <Divider />
         <List className="listMenu-item" onClick = {this.openTrainingContent(true)}>Training</List>
       </div>
     );

      return (
        <div className="Home">

        {/* Header */}
          <Header sendToHeader={this.openMenu}></Header>

        {/* SideMenu */}
         <SwipeableDrawer
            anchor  = "left"
            open    = {this.state.menuLeft}
            onClose = {this.closeMenu(false)}
            onOpen  = {this.openMenu}>

            <div
              tabIndex  = {0}
              role      = "button"
              onClick   = {this.closeMenu(false)}
              onKeyDown = {this.closeMenu(false)}>

              {sideList}

            </div>
          </SwipeableDrawer>

        {/* Contents */}
          {this.state.MainContentSelected     && (<MainContent></MainContent>)}
          {this.state.TrainingContentSelected && (<TrainingContent></TrainingContent>)}

        </div>
      );
    }
  }


Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
