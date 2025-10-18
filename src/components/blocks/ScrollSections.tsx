import ScrollSections from "@/components/ScrollSections";
import { getContentBlocks, ScrollSectionsBlock as ScrollSectionsBlockType } from "@/lib/wp";

interface ScrollSectionsBlockProps {
  pageSlug: string;
}

const ScrollSectionsBlockComponent = async ({ pageSlug }: ScrollSectionsBlockProps) => {
  try {
    const contentBlocks = await getContentBlocks(pageSlug);

    // Find the first scroll sections block
    const scrollSectionsBlockData = contentBlocks.find(block => block.__typename === 'ContentBlocksContainerContentBlocksScrollSectionLayout');

    if (!scrollSectionsBlockData) {
      return null; // Don't render anything if no scroll sections block found
    }

    // Transform the WordPress data to match the ScrollSections component props
    const scrollSectionsBlock: ScrollSectionsBlockType = {
      heading: scrollSectionsBlockData.heading,
      introContent: scrollSectionsBlockData.introContent,
      sections: scrollSectionsBlockData.sections?.map(section => ({
        image: section.scrollSection?.image,
        heading: section.scrollSection?.heading,
        content: section.scrollSection?.content,
        buttonLink: section.scrollSection?.buttonLink,
      })) || [],
    };

    return (
      <ScrollSections
        introHeading={scrollSectionsBlock.heading}
        introDescription={scrollSectionsBlock.introContent}
        sections={scrollSectionsBlock.sections?.map(section => ({
          image: {
            src: section.image?.node?.sourceUrl || '/vlp-01.jpg',
            alt: section.image?.node?.altText || section.heading || 'Scroll Section Image'
          },
          heading: section.heading || '',
          description: section.content || '',
          buttonText: section.buttonLink?.title,
          buttonLink: section.buttonLink?.url,
        }))}
        className="bg-gradient-to-b from-[#FFF4EB] to-sunflower-100"
      />
    );
  } catch (error) {
    console.error('Error in ScrollSectionsBlockComponent:', error);
    return null; // Don't render anything if there's an error
  }
};

export default ScrollSectionsBlockComponent;
