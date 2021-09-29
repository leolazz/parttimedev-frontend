import * as React from "react";

const NavBar: React.FC = () => {
  return (
    <div className='bs-component'>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <div className='container-fluid'>
          <p className='navbar-brand'>PartTimeDev.Work</p>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarColor01'
            aria-controls='navbarColor01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='navbarColor01'>
            <ul className='navbar-nav me-auto'>
              <li className='nav-item'></li>
              <li className='nav-item'>
                <p className='nav-link'>About</p>
              </li>
              <li className='nav-item dropdown'>
                <p
                  className='nav-link dropdown-toggle'
                  data-bs-toggle='dropdown'
                  role='button'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  Account
                </p>
                <div className='dropdown-menu'>
                  <p className='dropdown-item'>Action</p>
                  <p className='dropdown-item'>Another action</p>
                  <p className='dropdown-item'>Something else here</p>
                  <div className='dropdown-divider'></div>
                  <p className='dropdown-item'>Separated link</p>
                </div>
              </li>
            </ul>
            <form className='d-flex'>
              <input
                className='form-control me-sm-2'
                type='text'
                placeholder='Search'
              />
              <button className='btn btn-secondary my-2 my-sm-0' type='submit'>
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export { NavBar };
