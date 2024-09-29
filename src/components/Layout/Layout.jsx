import { Outlet } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import styles from './Layout.module.css';

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <Outlet /> 
    </div>
  );
};

export default Layout;
