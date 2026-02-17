import React from 'react'
import styles from './Header.module.scss'
import HeaderUp from '../HeaderUp/HeaderUp/HeaderUp'
import HeaderDown from '../HeaderDown/HeaderDown/HeaderDown'

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderUp />
      <HeaderDown className={styles.headerDowns}/>
    </header>
  );
};

export default Header;
