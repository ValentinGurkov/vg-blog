import React, { Component } from 'react';
import classes from './Header.scss';
import Logo from '../../components/Logo/Logo';
import DrawerToggle from '../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';

class Hader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false
    };
  }

  onSideDrawerToggled = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  };

  onSideDrawerClosed = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    const desktopNav = ['navigation', 'desktopOnly'].join(' ');
    return (
      <header>
        <div className="wrapperNav">
          <Logo />
          <nav className={desktopNav}>
            <NavigationItems />
          </nav>
          <DrawerToggle handleClicked={this.onSideDrawerToggled} />
          <SideDrawer open={this.state.showSideDrawer} closed={this.onSideDrawerClosed} />
        </div>
        <style jsx scoped>{classes}</style>
      </header>
    );
  }
}

export default Hader;
