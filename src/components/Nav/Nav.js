import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/alerts">
            My Alerts
          </Link>
        </li>
        <li>
          <Link to="/create">
            Create Alert
          </Link>
        </li>
        <li>
          <Link to="/account">
            My Account
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
