import React from 'react';
import classes from './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className="menu">
    <NavigationItem to="/" title="Home">
      Home
    </NavigationItem>
    <NavigationItem to="/articles" title="Articles">
      Articles
    </NavigationItem>
    <NavigationItem to="/ourMission" as="/our-mission" title="Our Mission">
      Our mission
    </NavigationItem>
    <style jsx>{classes}</style>
  </ul>
);

export default NavigationItems;
