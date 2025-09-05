import { DarkMode } from "./DarkMode";
import DropDownListMenu from "./DropDownListMenu";
import Logo from "./Logo";
import Search from "./Search";

function NavBar() {
  return (
    <nav>
      <div className="flex-cols container flex justify-between gap-4 py-8 sm:flex-row sm:items-center">
        <Logo />
        <Search />
        <div className="flex gap-4">
          <DarkMode />
          <DropDownListMenu />
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
