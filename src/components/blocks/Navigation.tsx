import { getMainMenu, WPMenuItem } from "@/lib/wp";
import NavigationClient from "@/components/Navigation";

const NavigationBlock = async () => {
  // Fetch menu data from WordPress
  const menuItems = await getMainMenu();

  // Fallback menu items if WordPress menu is empty
  const fallbackMenuItems: WPMenuItem[] = [
    { id: "pricing", label: "Pricing", url: "/wedding-photography-packages", path: "/wedding-photography-packages" },
    { id: "photography", label: "Photography", url: "/wedding-photography", path: "/wedding-photography" },
    { id: "blog", label: "Blog", url: "/wedding-photography-blog", path: "/wedding-photography-blog" },
    { id: "about", label: "About me", url: "/about-vicki", path: "/about-vicki" },
  ];

  // Use WordPress menu if available, otherwise fallback
  const navLinks = menuItems.length > 0 ? menuItems : fallbackMenuItems;

  return <NavigationClient navLinks={navLinks} />;
};

export default NavigationBlock; 