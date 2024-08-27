import { PlusCircle } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 bg-black text-white w-screen p-3 flex content-center justify-between">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/todos/new">
        <PlusCircle size={32} weight="duotone" />
      </NavLink>
    </nav>
  );
};

export default NavBar;
