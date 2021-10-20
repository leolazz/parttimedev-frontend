import * as React from "react";

const NavBar: React.FC = () => {
  return (
    <section className='basic-inline'>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <div className='container-fluid'>
          <p className='navbar-brand'>PartTimeDev.Work</p>
          <div className='collapse navbar-collapse' id='navbarColor01'>
            <ul className='navbar-nav me-auto'>
              <li className='nav-item'></li>
              <li className='nav-item'>
                <p className='nav-link'>About</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export { NavBar };
