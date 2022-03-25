import React from 'react';
import {Link, useMatch} from 'react-router-dom';

import classNames from 'classnames';

const Header: React.FC = () => {
  const [path, setPath] = React.useState<string>('/level');
  const [keyword, setKeyword] = React.useState<string>(() => '');

  const match = (path: string) => {
    return useMatch({ path, end: true });
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={'/'} id="link-logo"><h1>DevCad</h1></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className={classNames({'router-link': true, active: match('/')})} aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/level" className={classNames({'router-link': true, active: match('/level')})} aria-current="page">Níveis</Link>
              </li>
              <li className="nav-item">
                <Link to="/developer" className={classNames({'router-link': true, active: match('/developer')})} aria-current="page">Desenvolvedores</Link>
              </li>
            </ul>
            <form className="d-flex">
              <select className='search-type' onChange={(e) => setPath(e.target.value)}>
                <option value="/level">Níveis</option>
                <option value="/developer">Desenvolvedores</option>
              </select>
              <input className="form-control me-2" type="search" placeholder="Pesquisa" aria-label="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              <Link to={{pathname: path, search: `?k=${keyword}`}}>
                <button className="btn btn-outline-success" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
