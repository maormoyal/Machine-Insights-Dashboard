import React, { useState } from 'react';
import styles from './Layout.module.scss';
import { NAV_ITEMS } from '../../shared/constants/navItems';

import datamindLogo from '../../assets/datamind-logo.icon.svg';
import logoutIcon from '../../assets/logout.icon.svg';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [selectedNavItem, setSelectedNavItem] = useState<string>('Diagnostics');

  const handleNavItemClick = (item: string) => {
    setSelectedNavItem(item);
  };

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <ul>
            {NAV_ITEMS.map((item) => (
              <li
                key={item.title}
                className={`${styles.navItem} ${
                  selectedNavItem === item.title ? styles.selected : ''
                }`}
                title={item.title}
                onClick={() => handleNavItemClick(item.title)}
              >
                <img src={item.icon} alt={`${item.title} Icon`} width={16} />
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.profileContainer}>
          <div className={styles.navItem} title='Logout'>
            <img src={logoutIcon} alt='logout Icon' width={16} />
          </div>
          <div className={styles.profile} title='User'>
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
