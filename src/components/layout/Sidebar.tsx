import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const linkStyle = 'block px-4 py-2 rounded transition-colors duration-200';
  const activeStyle = 'bg-gray-800 text-white';
  const inactiveStyle = 'text-gray-300 hover:bg-gray-800';
  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };
  return (
    <aside className="bg-gray-900 text-white w-60 min-h-screen p-4">
      <h2 className="text-xl font-semibold mb-6">DSA Admin</h2>
      <nav className="space-y-2">
        <div>
          <button
            onClick={() => toggleMenu("products")}
            className="flex items-center justify-between w-full px-4 py-2 text-left rounded hover:bg-gray-800"
          >
            <span>📦 Products</span>
            {openMenu === "products" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {openMenu === "products" && (
            <div className="ml-4 mt-1 space-y-1">
              <NavLink
                to="/undo"
                className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
              >
                🔁 Undo / Redo
              </NavLink>
              <NavLink
                to="/add-product"
                className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
              >
                🔁 Add Product
              </NavLink>
              <NavLink
                to="/product-carousel"
                className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
              >
                🔁 Product Carousel
              </NavLink>
              <NavLink
                to="/budget-products"
                className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
              >
                🪙 Budget Products
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
            </div>)}
        </div>
        <div>
          <button
            onClick={() => toggleMenu("categories")}
            className="flex items-center justify-between w-full px-4 py-2 text-left rounded hover:bg-gray-800"
          >
            <span>📂 Categories</span>
            {openMenu === "categories" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {openMenu === "categories" && (
            <div className="ml-4 mt-1 space-y-1">
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
                to="/categories-dfs"
                className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
              >
                Categories DFS
              </NavLink>
              
            </div>)}
        </div>
        <div>
          <button
            onClick={() => toggleMenu("utils")}
            className="flex items-center justify-between w-full px-4 py-2 text-left rounded hover:bg-gray-800"
          >
            <span>⚙️ Utilities</span>
            {openMenu === "utils" ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </button>
          {openMenu === "utils" && (
            <div className="ml-4 mt-1 space-y-1">
              <NavLink
                to="/search"
                className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
              >
                🔍 Search + Sort
              </NavLink>
              <NavLink
                to="/search-products"
                className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
              >
                Sarch V2
              </NavLink>
              <NavLink
                to="/discounts"
                className={({ isActive }) => `${linkStyle} ${isActive ? activeStyle : inactiveStyle}`}
              >
                Discounts
              </NavLink>

            </div>)}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;