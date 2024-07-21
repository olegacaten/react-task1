import React from 'react';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.ContainerAbove}>
    <div className={styles.Container}>
      {children}
    </div>
    </div>
  );
};

export default MainLayout;
