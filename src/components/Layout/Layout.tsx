// src/components/Layout/Layout.tsx
import React from 'react';
import styles from './Layout.module.scss';

import datamindLogo from '../../assets/datamind-logo.icon.svg';
import factoryIcon from '../../assets/factory.icon.svg';
import circleInfoIcon from '../../assets/circle-info.icon.svg';
import bellIcon from '../../assets/bell.icon.svg';
import fileIcon from '../../assets/file.icon.svg';
import settingsIcon from '../../assets/settings.icon.svg';
import logoutIcon from '../../assets/logout.icon.svg';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <ul>
            <li className={styles.navItem}>
              <img src={factoryIcon} alt='factory Icon' width={24} />
            </li>
            <li className={styles.navItem}>
              <img src={circleInfoIcon} alt='circle-Info Icon' width={24} />
            </li>
            <li className={styles.navItem}>
              <img src={bellIcon} alt='bell Icon' width={24} />
            </li>
            <li className={styles.navItem}>
              <img src={fileIcon} alt='file Icon' width={24} />
            </li>
            <li className={styles.navItem}>
              <img src={settingsIcon} alt='settings Icon' width={24} />
            </li>
          </ul>
        </nav>
        <div className={styles.profileContainer}>
          <div className={styles.navItem}>
            <img src={logoutIcon} alt='logout Icon' width={24} />
          </div>
          <div className={styles.profile}>
            <span className={styles.profileInitials}>MM</span>
          </div>
        </div>
      </aside>
      <header className={styles.topBar}>
        <div className={styles.logo}>
          <img src={datamindLogo} alt='datamind-Logo' />
        </div>
      </header>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default Layout;
