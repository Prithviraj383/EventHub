import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${isActive ? "text-brand" : "text-ink/70 hover:text-ink"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-ink">
          <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
            EH
          </span>
          <span>EventHub</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
          )}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {!isAuthenticated ? (
            <>
              <Link className="ghost-btn" to="/login">
                Login
              </Link>
              <Link className="primary-btn" to="/signup">
                Sign up
              </Link>
            </>
          ) : (
            <button className="primary-btn" type="button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
        <button
          type="button"
          className="inline-flex items-center rounded-full border border-ink/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Menu
        </button>
      </div>
      {isOpen && (
        <div className="border-t border-white/40 bg-white/90 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <NavLink to="/" className={linkClass} onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>
              Dashboard
            </NavLink>
            {user?.role === "admin" && (
              <NavLink to="/admin" className={linkClass} onClick={() => setIsOpen(false)}>
                Admin
              </NavLink>
            )}
            {!isAuthenticated ? (
              <div className="flex gap-3 pt-2">
                <Link className="ghost-btn" to="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link className="primary-btn" to="/signup" onClick={() => setIsOpen(false)}>
                  Sign up
                </Link>
              </div>
            ) : (
              <button className="primary-btn" type="button" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
