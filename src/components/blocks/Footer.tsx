import Footer from "@/components/Footer";
import { getFooterMenu, getContactDetails } from "@/lib/wp";

const FooterBlock = async () => {
  const [menuItems, contactDetails] = await Promise.all([
    getFooterMenu(),
    getContactDetails()
  ]);

  return (
    <Footer 
      menuItems={menuItems}
      contactDetails={contactDetails}
    />
  );
};

export default FooterBlock;
