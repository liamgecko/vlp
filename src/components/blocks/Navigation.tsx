import { getMainMenu, WPMenuItem } from "@/lib/wp";
import NavigationClient from "@/components/Navigation";

const NavigationBlock = async () => {
  // Fetch menu data from WordPress
  const menuItems = await getMainMenu();

  // Fallback menu items if WordPress menu is empty
  const fallbackMenuItems: WPMenuItem[] = [
    { id: "pricing", label: "Pricing", url: "/pricing", path: "/pricing" },
    { id: "photography", label: "Photography", url: "/photography", path: "/photography" },
    { id: "blog", label: "Blog", url: "/blog", path: "/blog" },
    { id: "about", label: "About me", url: "/about", path: "/about" },
  ];

  // Use WordPress menu if available, otherwise fallback
  const navLinks = menuItems.length > 0 ? menuItems : fallbackMenuItems;

  return <NavigationClient navLinks={navLinks} />;
};

export default NavigationBlock; 