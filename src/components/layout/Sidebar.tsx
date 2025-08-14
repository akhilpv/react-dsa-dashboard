import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkStyle = 'block px-4 py-2 rounded transition-colors duration-200';
  const activeStyle = 'bg-gray-800 text-white';
  const inactiveStyle = 'text-gray-300 hover:bg-gray-800';

  return (
    <aside className="bg-gray-900 text-white w-60 min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">DSA Admin</h2>
      <nav className="space-y-2">
        
        <NavLink
          to="/undo"
          className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
        >
          🔁 Undo / Redo 
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
        >
          🔍 Search + Sort
        </NavLink>
        <NavLink
          to="/budget-products"
          className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
        >
          🪙 Budget Products 
        </NavLink>
        <NavLink
          to="/search-products"
          className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
        >
          Sarch V2
        </NavLink>
        <NavLink
          to="/categories"
          className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
        >
          Categories
        </NavLink>
        <NavLink
          to="/categories-search"
          className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
        >
          Categories Search
        </NavLink>
        <NavLink
          to="/categories-group"
          className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
        >
          Categories Group
        </NavLink>
        <NavLink
          to="/related-products"
          className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
        >
          Related Products
        </NavLink>
        <NavLink
          to="/unique-products"
          className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
        >
          Unique Products
        </NavLink>
        
      </nav>
    </aside>
  );
};

export default Sidebar;