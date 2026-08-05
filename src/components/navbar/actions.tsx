import ThemeSwitcher from "../themeswitcher";
import Tooltip from "../ui/tooltip";

export default function NavbarActions() {
  return (
    <div
      className="
        ml-auto
        flex
        items-center
        gap-1
        sm:gap-2
        overflow-visible
      "
    >
      {/* Theme Switcher */}
      <Tooltip text="Change Theme">
        <ThemeSwitcher />
      </Tooltip>
    </div>
  );
}
