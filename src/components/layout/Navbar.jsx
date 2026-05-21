import { NavLink } from "react-router-dom";

function Navbar({
  brand = "Task Manager",
  links = [],
  actions,
  className = "",
}) {
  return (
    <header className={`border-b bg-white ${className}`}>
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-blue-600">{brand}</div>

        {links.length > 0 && (
          <nav className="flex items-center gap-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}

        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </header>
  );
}

export default Navbar;
