import { PlusCircle } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 bg-gray-500 text-black dark:bg-black dark:text-white font-bold w-screen p-3 flex content-center justify-between dark:border-b-2 dark:border-white">
      <div></div>
      <div className="flex items-center text-2xl font-bold font-mono">
        <NavLink to="/">TaskMaster.</NavLink>
      </div>
      <div className="flex items-center">
        <div>
          <ThemeToggle />
        </div>
        <div className="ml-1">
          <NavLink to="/todos/new">
            <PlusCircle size={32} weight="duotone" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
