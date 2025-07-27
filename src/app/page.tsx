import Hero from "@/components/Hero";
import ImageText from "@/components/ImageText";
import ImageSlider from "@/components/ImageSlider";
import ImageTextCarousel from "@/components/ImageTextCarousel";
import ScrollSections from "@/components/ScrollSections";
import { TestimonialSection } from "@/components/ScrollRevealText";
import { AccordionScroll } from "@/components/AccordionScroll";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import FullWidthImage from "@/components/FullWidthImage";
import CardGrid from "@/components/CardGrid";


export default function Home() {
  return (
    <>
      <Hero 
        backgroundImage={{
          src: "/vlp-01.jpg",
          alt: "Victoria Photography Hero - Beautiful wedding photography"
        }}
        subtitle="Wedding photography in scotland"
        heading="When you're not just mouth happy, you're eyeball happy!"
        buttonText="Save the date"
        buttonLink="/contact"
        buttonAriaLabel="Contact Victoria Photography"
      />
      <ImageText
        title="Image left with text right heading."
        description="Hello, I'm Vicki—a seasoned wedding photographer in Fife but capturing hearts and moments across the world, including, British Columbia, Cyprus, Ibiza, Thailand and beyond. Passionate about nature, dogs, and epic landscapes, I bring a blend of enthusiasm, energy, and a hint of playful innuendo to every wedding. Your wedding day should be a joyous celebration, filled with hugs, dance moves, and romantic moments that feel like a scene out of a fairytale. It’s about enjoying every second with your loved ones, immersed in laughter and love. As your wedding photographer, my goal is to make your special day unforgettable by capturing every genuine emotion and spontaneous moment."
        imageSrc="/vicki.jpg"
        imageAlt="Victoria Photography"
        variant="left"
        buttonText="Learn More"
        buttonLink="/about"
      />
      <ScrollSections 
        introHeading="Sticky scrolling sections"
        introDescription="This is a sticky scrolling sections component. It's a great way to add some extra content to your page."
        sections={[
          {
            image: {
              src: "/vlp-01.jpg",
              alt: "Wedding Photography - Beautiful couple in love"
            },
            heading: "For the bold",
            description: "This is a sticky scrolling sections component. It's a great way to add some extra content to your page.",
            buttonText: "Book me",
            buttonLink: "/contact"
          },
          {
            image: {
              src: "/vlp-03.jpg",
              alt: "Sticky scrolling sections - Beautiful couple in love"
            },
            heading: "For the daring",
            description: "This is a sticky scrolling sections component. It's a great way to add some extra content to your page.",
            buttonText: "Book me",
            buttonLink: "/contact"
          },
          {
            image: {
              src: "/vlp-05.jpg",
              alt: "Artistic Photography - Timeless wedding memories"
            },
            heading: "For the creative",
            description: "This is a sticky scrolling sections component. It's a great way to add some extra content to your page.",
            buttonText: "Book me",
            buttonLink: "/contact"
          }
        ]}
      />
      <ImageText
        title="Image right with text left heading."
        description="Hello, I'm Vicki—a seasoned wedding photographer in Fife but capturing hearts and moments across the world, including, British Columbia, Cyprus, Ibiza, Thailand and beyond. Passionate about nature, dogs, and epic landscapes, I bring a blend of enthusiasm, energy, and a hint of playful innuendo to every wedding."
        imageSrc="/vicki.jpg"
        imageAlt="Victoria Photography"
        variant="right"
        buttonText="Get Started"
        buttonLink="/contact"
      />
      <ImageSlider 
        images={[
          {
            src: '/vlp-01.jpg',
            alt: 'Wedding Photography'
          },
          {
            src: '/vlp-02.jpg',
            alt: 'Natural Photography'
          },
          {
            src: '/vlp-03.jpg',
            alt: 'Artistic Photography'
          },
          {
            src: '/vlp-04.jpg',
            alt: 'Wedding Photography'
          },
          {
            src: '/vlp-05.jpg',
            alt: 'Wedding Photography'
          }
        ]}
        autoplay={false}
        autoplayDelay={4000}
        showNavigation={true}
        showHeading={true}
        heading="Image slider"
        description="This is a image slider component. It's a great way to add some extra content to your page."
      />
      <TestimonialSection 
        heading="We couldn't recommend or thank her enough for her amazing work that she does! From making us feel super comfortable in front of the camera and putting up with our awkwardness, everyone who has seen the photos have thought they were amazing."
        author="— Sarah & James"
        backgroundImage="/vlp-01.jpg"
      />
      <ImageTextCarousel
        slides={[
          {
            imageSrc: '/vlp-01.jpg',
            imageAlt: 'Wedding Photography',
            title: 'Slide with content',
            description: 'This is a slide with content. It\'s a great way to add some extra content to your page.',
          },
          {
            imageSrc: '/vlp-02.jpg',
            imageAlt: 'Natural Photography',
            title: 'Slide with content',
            description: 'This is a slide with content. It\'s a great way to add some extra content to your page.',
          },
          {
            imageSrc: '/vlp-03.jpg',
            imageAlt: 'Artistic Photography',
            title: 'Slide with content',
            description: 'This is a slide with content. It\'s a great way to add some extra content to your page.',
          }
        ]}
        autoplay={false}
        autoplayDelay={6000}
        showNavigation={true}
        heading="Slider with content"
        description="This is a slider with content component. It's a great way to add some extra content to your page."
        showHeading={true}
      />
      <AccordionScroll 
        heading="Accordion sticky scroll section"
        description="This is a accordion scroll component. It's a great way to add some extra content to your page."
        features={[
          {
            anchor: {
              url: "#",
              number: "01",
              title: "It starts before your big day!",
            },
            tagline: "Pre-wedding",
            heading: "I'll meet you for a coffee to get to know you",
            description:
              "I'll meet you for a coffee to get to know you. I'll ask you about your love story, your wedding plans, and your expectations for your wedding photos. I'll also show you my portfolio and answer any questions you have.",
            image: {
              src: "/vlp-01.jpg",
              alt: "Natural wedding photography capturing genuine moments",
            },
          },
          {
            anchor: {
              url: "#",
              number: "02",
              title: "It's finally here!",
            },
            tagline: "On the day",
            heading: "Pre-nuptial photoshoot",
            description:
              "I'll meet you for a coffee to get to know you. I'll ask you about your love story, your wedding plans, and your expectations for your wedding photos. I'll also show you my portfolio and answer any questions you have.",
            image: {
              src: "/vlp-02.jpg",
              alt: "Wedding photography with stunning Scottish landscapes",
            },
          },
          {
            anchor: {
              url: "#",
              number: "03",
              title: "Time to say 'I do'",
            },
            tagline: "Your wedding day",
            heading: "I'll be there to capture your special day",
            description:
              "Your wedding photos should be more than just snapshots - they should be works of art. I combine technical expertise with creative vision to create images that are both beautiful and meaningful. From composition and lighting to post-processing, every detail is carefully considered.",
            image: {
              src: "/vlp-03.jpg",
              alt: "Artistic wedding photography with creative vision",
            },
          },
          {
            anchor: {
              url: "#",
              number: "04",
              title: "Now it's time to relax (or let your hair down)",
            },
            tagline: "Dinner and dancing",
            heading: "I'll be there to capture your special day",
            description:
              "I'm not just there to take photos - I'm there to be part of your wedding experience. I'll help you feel comfortable, guide you through the day, and ensure you have fun while creating beautiful memories. Your wedding day should be enjoyable, not stressful, and I'm here to make that happen.",
            image: {
              src: "/vlp-04.jpg",
              alt: "Personal wedding photography experience",
            },
          },
        ]}
      />
      <FullWidthImage 
        imageSrc="/vlp-05.jpg" 
        imageAlt="Beautiful wedding photography moment"
      />
      <CallToAction 
        title="Ready to capture your special day?"
        description="Let's create beautiful memories together. Get in touch to discuss your wedding photography needs and start planning your perfect day."
        buttonText="Get In Touch"
        buttonLink="/contact"
      />
      <CardGrid 
        heading="Latest Weddings"
        description="Discover the beautiful love stories I've had the privilege to capture. Each wedding is unique, and every couple has their own special story to tell."
        buttonText="View All Weddings"
        buttonLink="/weddings"
        showHeading={true}
      />
      <Footer />
    </>
  );
}
