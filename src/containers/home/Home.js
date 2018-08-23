/** Natives **/
import React from 'react';

/** Containers **/
import Header          from '../../components/header/Header'
import MainContent     from '../../components/content/global/MainContent'
import TrainingContent from '../../components/content/projet1/TrainingContent'

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
    super(props);
    this.openMenu = this.openMenu.bind(this);
  }

  state = {
    menuLeft                : false, // State of the left menu.
    mainContentSelected     : true,  // When Main Content is selected
    trainingContentSelected : false, // When Training Content is selected
    pageName : 'Main'
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
      pageName : 'Main',
      mainContentSelected     : open,
      trainingContentSelected : false
    });
  };

  /** To show the Training Content **/
  openTrainingContent = (open) => () => {
    this.setState({
      pageName : 'Training',
      trainingContentSelected : open,
      mainContentSelected     : false
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
          <Header sendToHeader={this.openMenu} pageName={this.state.pageName}></Header>

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
          {this.state.mainContentSelected     && (<MainContent></MainContent>)}
          {this.state.trainingContentSelected && (<TrainingContent></TrainingContent>)}

        </div>
      );
    }
  }


Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
