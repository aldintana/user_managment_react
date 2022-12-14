import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>Users</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>All Users</Link>
          </li>
          <li>
            <Link to='/create-user'>Create User</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
