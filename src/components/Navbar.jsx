import { NavLink, Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="Jarurat Care Home">
          <span className="logo" aria-hidden />
          <span>Jarurat Care</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined}>Home</NavLink>
          <NavLink to="/patients" className={({ isActive }) => isActive ? 'active' : undefined}>Patients</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined}>About</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
