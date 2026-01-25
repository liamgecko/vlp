import Footer from "@/components/Footer";
import { getFooterMenu, getContactDetails, WPMenuItem } from "@/lib/wp";

const FooterBlock = async () => {
  const [menuItems, contactDetails] = await Promise.all([
    getFooterMenu(),
    getContactDetails()
  ]);

  // Fallback menu items if WordPress menu is empty (similar to Navigation)
  const fallbackMenuItems: WPMenuItem[] = [
    { id: "pricing", label: "Pricing", url: "/wedding-photography-packages", path: "/wedding-photography-packages" },
    { id: "photography", label: "Photography", url: "/wedding-photography", path: "/wedding-photography" },
    { id: "blog", label: "Blog", url: "/wedding-photography-blog", path: "/wedding-photography-blog" },
    { id: "about", label: "About me", url: "/about-vicki", path: "/about-vicki" },
  ];

  // Use WordPress menu if available, otherwise fallback
  const navLinks = menuItems.length > 0 ? menuItems : fallbackMenuItems;

  return (
    <Footer 
      menuItems={navLinks}
      contactDetails={contactDetails}
    />
  );
};

export default FooterBlock;
