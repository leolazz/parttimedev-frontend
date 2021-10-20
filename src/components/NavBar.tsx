import * as React from "react";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container-fluid'>
        <NavLink style={{ textDecoration: "none" }} to='/'>
          <p className='navbar-brand'>PartTimeDev.Work</p>
        </NavLink>
        <NavLink style={{ textDecoration: "none" }} to='/about'>
          <p className='navbar-brand'>About</p>
        </NavLink>
      </div>
    </nav>
  );
};

export { NavBar };
