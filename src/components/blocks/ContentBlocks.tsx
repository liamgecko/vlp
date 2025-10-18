import { getContentBlocks, HeroBlock, ImageTextBlock, ScrollSectionsBlock, TestimonialBlock, CarouselBlock, ImageTextCarouselBlock } from "@/lib/wp";
import Hero from "@/components/Hero";
import ImageText from "@/components/ImageText";
import ScrollSections from "@/components/ScrollSections";
import { TestimonialSection } from "@/components/ScrollRevealText";
import CarouselSection from "@/components/Carousel";
import ImageTextCarousel from "@/components/ImageTextCarousel";
import PricingTableBlockComponent from "@/components/blocks/PricingTable";
import GalleryBlockComponent from "@/components/blocks/Gallery";
import TextBlockComponent from "@/components/blocks/TextBlock";
import VideoBlockComponent from "@/components/blocks/Video";

interface ContentBlocksProps {
  pageSlug: string;
}

// Shared utility function for block colour mapping
const getBlockColourClass = (blockColour?: string | string[]) => {
  if (!blockColour) return '';
  
  // Handle array case (ACF sometimes returns arrays)
  const colourValue = Array.isArray(blockColour) ? blockColour[0] : blockColour;
  
  const colourMap: Record<string, string> = {
    'sunflower_solid': 'block-sunflower-solid',
    'sunflower_gradient': 'block-sunflower-gradient',
    'peach_solid': 'block-peach-solid',
    'peach_gradient': 'block-peach-gradient',
    'blush_solid': 'block-blush-solid',
    'blush_gradient': 'block-blush-gradient',
    'violet_solid': 'block-violet-solid',
    'violet_gradient': 'block-violet-gradient',
    'midnight_solid': 'block-midnight-solid',
    'midnight_gradient': 'block-midnight-gradient',
  };
  
  return colourMap[colourValue] || '';
};

const ContentBlocks = async ({ pageSlug }: ContentBlocksProps) => {
  try {
    const contentBlocks = await getContentBlocks(pageSlug);
    
    if (!contentBlocks || contentBlocks.length === 0) {
      return null;
    }

    return (
      <>
        {contentBlocks.map((block, index) => {
          switch (block.__typename) {
            case 'ContentBlocksContainerContentBlocksHeroBlockLayout':
              const heroBlock: HeroBlock = {
                heroHeading: block.heroHeading,
                heroImage: block.heroImage,
                heroSubHeading: block.heroSubHeading,
                primaryButton: block.primaryButton,
                secondaryButton: block.secondaryButton,
              };
              return <Hero key={index} heroData={heroBlock} />;

            case 'ContentBlocksContainerContentBlocksImageWithTextLayout':
              const imageTextBlock: ImageTextBlock = {
                heading: block.heading,
                content: block.content,
                image: block.image,
                video: block.video,
                imagePosition: block.imagePosition,
                buttonLink: block.buttonLink,
                blockColour: block.blockColour,
              };

              // Handle case where imagePosition might be an array or have different casing
              let positionValue = imageTextBlock.imagePosition;
              if (Array.isArray(positionValue)) {
                positionValue = positionValue[0]; // Take first value if it's an array
              }
              if (typeof positionValue === 'string') {
                positionValue = positionValue.toLowerCase().trim(); // Normalize to lowercase and trim whitespace
              }
              
              const variant = positionValue === 'left' ? 'left' : 'right';
              
              return (
                <ImageText
                  key={index}
                  title={imageTextBlock.heading || ''}
                  description={imageTextBlock.content || ''}
                  imageSrc={imageTextBlock.image?.node?.sourceUrl}
                  imageAlt={imageTextBlock.image?.node?.altText || imageTextBlock.heading || ''}
                  videoUrl={imageTextBlock.video}
                  variant={variant}
                  buttonText={imageTextBlock.buttonLink?.title}
                  buttonLink={imageTextBlock.buttonLink?.url}
                  blockColourClass={getBlockColourClass(imageTextBlock.blockColour)}
                />
              );

            case 'ContentBlocksContainerContentBlocksScrollSectionLayout':
              const scrollSectionsBlock: ScrollSectionsBlock = {
                heading: block.heading, // Using the shared heading field
                introContent: block.introContent,
                sections: block.sections?.map(section => ({
                  image: section.scrollSection?.image,
                  heading: section.scrollSection?.heading,
                  content: section.scrollSection?.content,
                  buttonLink: section.scrollSection?.buttonLink,
                })) || [],
              };

              return (
                <ScrollSections
                  key={index}
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

            case 'ContentBlocksContainerContentBlocksTestimonialLayout':
              const testimonialBlock: TestimonialBlock = {
                quote: block.quote,
                reviewerName: block.reviewerName,
                backgroundImage: block.backgroundImage,
              };

              return (
                <TestimonialSection
                  key={index}
                  heading={testimonialBlock.quote || ''}
                  author={testimonialBlock.reviewerName ? `— ${testimonialBlock.reviewerName}` : undefined}
                  backgroundImage={testimonialBlock.backgroundImage?.node?.sourceUrl || '/vlp-01.jpg'}
                  className=""
                />
              );

            case 'ContentBlocksContainerContentBlocksCarouselLayout':
              const carouselBlock: CarouselBlock = {
                heading: block.heading,
                introContent: block.introContent,
                carouselImages: block.carouselImages,
                blockColour: block.blockColour,
              };

              // Safely handle the carouselImages
              let slides: Array<{ src: string; alt: string }> = [];
              if (Array.isArray(carouselBlock.carouselImages)) {
                slides = carouselBlock.carouselImages.map(image => ({
                  src: image.sourceUrl,
                  alt: image.altText || 'Carousel image'
                }));
              } else if (carouselBlock.carouselImages && typeof carouselBlock.carouselImages === 'object' && 'nodes' in carouselBlock.carouselImages) {
                // If it's an object with nodes property
                const images = carouselBlock.carouselImages.nodes || [];
                slides = images.map(image => ({
                  src: image.sourceUrl,
                  alt: image.altText || 'Carousel image'
                }));
              }

              return (
                <CarouselSection
                  key={index}
                  title={carouselBlock.heading || ''}
                  description={carouselBlock.introContent || ''}
                  slides={slides}
                  blockColourClass={getBlockColourClass(carouselBlock.blockColour)}
                />
              );

            case 'ContentBlocksContainerContentBlocksTextCarouselLayout':
              const imageTextCarouselBlock: ImageTextCarouselBlock = {
                introHeading: block.introHeading,
                introContent: block.introContent,
                carouselItems: block.carouselItems,
                blockColour: block.blockColour,
              };

              return (
                <ImageTextCarousel
                  key={index}
                  heading={imageTextCarouselBlock.introHeading || ''}
                  description={imageTextCarouselBlock.introContent || ''}
                  slides={imageTextCarouselBlock.carouselItems?.map(carouselItem => ({
                    imageSrc: carouselItem.item?.itemImage?.node?.sourceUrl || '/vlp-01.jpg',
                    imageAlt: carouselItem.item?.itemImage?.node?.altText || carouselItem.item?.itemHeading || 'Carousel image',
                    title: carouselItem.item?.itemHeading || '',
                    description: carouselItem.item?.itemContent || '',
                    itemColour: carouselItem.item?.itemColour,
                  })) || []}
                  showHeading={true}
                  autoplay={false}
                  showNavigation={true}
                  blockColourClass={getBlockColourClass(imageTextCarouselBlock.blockColour)}
                />
              );

            case 'ContentBlocksContainerContentBlocksPricingTableLayout':
              return (
                <PricingTableBlockComponent
                  key={index}
                  pageSlug={pageSlug}
                  blockColourClass={getBlockColourClass(block.blockColour)}
                />
              );

            case 'ContentBlocksContainerContentBlocksGalleryLayout':
              return (
                <GalleryBlockComponent
                  key={index}
                  pageSlug={pageSlug}
                  blockColourClass={getBlockColourClass(block.blockColour)}
                />
              );

            case 'ContentBlocksContainerContentBlocksTextBlockLayout':
              return (
                <TextBlockComponent
                  key={index}
                  pageSlug={pageSlug}
                  blockColourClass={getBlockColourClass(block.blockColour)}
                />
              );

            case 'ContentBlocksContainerContentBlocksVideoLayout':
              return (
                <VideoBlockComponent
                  key={index}
                  pageSlug={pageSlug}
                  blockColourClass={getBlockColourClass(block.blockColour)}
                />
              );

            default:
              console.warn(`Unknown block type: ${block.__typename}`);
              return null;
          }
        })}
      </>
    );
  } catch (error) {
    console.error('Error in ContentBlocks:', error);
    return null;
  }
};

export default ContentBlocks;
