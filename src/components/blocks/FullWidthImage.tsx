import FullWidthImage from "@/components/FullWidthImage";
import { getPageBySlug } from "@/lib/wp";

interface FullWidthImageBlockProps {
  pageSlug?: string;
}

const FullWidthImageBlock = async ({ pageSlug }: FullWidthImageBlockProps = {}) => {
  let featuredImage;
  
  try {
    // Use provided slug or default to "home"
    const slug = pageSlug || "home";
    const page = await getPageBySlug(slug);
    featuredImage = page?.featuredImage;
  } catch (error) {
    console.error("Error fetching page for FullWidthImage:", error);
  }

  return (
    <FullWidthImage 
      featuredImage={featuredImage}
    />
  );
};

export default FullWidthImageBlock;
