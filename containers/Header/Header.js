import React, { Component } from 'react';
import classes from './Header.scss';
import Logo from '../../components/Logo/Logo';
import DrawerToggle from '../../components/Navigation/SideDrawer/DrawerToggle/DrawerToggle';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';

class Hader extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerToggledHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  };

  sideDrawerClosedHandler = () => {
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
          <DrawerToggle clicked={this.sideDrawerToggledHandler} />
          <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        </div>
        <style jsx>{classes}</style>
      </header>
    );
  }
}

export default Hader;
