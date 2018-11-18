import React from 'react';
import Link from 'next/link';
import classes from './NavigationItems.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
  return (
    <ul className={classes.menu}>
      <NavigationItem to='/' title='Home' prefetch>
        Home
      </NavigationItem>
      <NavigationItem to='/articles' title='Articles' prefetch>
        Articles
      </NavigationItem>
      <NavigationItem
        to='/ourMission'
        as='our-mission'
        title='Our Mission'
        prefetch>
        Our mission
      </NavigationItem>
    </ul>
  );
};

export default NavigationItems;
