import Hero from "@/components/Hero";
import ImageText from "@/components/ImageText";
import ImageTextCarousel from "@/components/ImageTextCarousel";
import ScrollSections from "@/components/ScrollSections";
import { TestimonialSection } from "@/components/ScrollRevealText";
import CarouselSection from "@/components/CarouselSection";


export default function Home() {
const SLIDES = [
  { src: "/vlp-01.jpg", alt: "Wedding carousel - Beautiful couple moment" },
  { src: "/vlp-02.jpg", alt: "Wedding carousel - Ceremony celebration" },
  { src: "/vlp-03.jpg", alt: "Wedding carousel - Reception joy" },
  { src: "/vlp-04.jpg", alt: "Wedding carousel - Romantic moment" },
  { src: "/vlp-05.jpg", alt: "Wedding carousel - Wedding details" }
]

  return (
    <>
      <Hero 
        backgroundImage={{
          src: "/vlp-01.jpg",
          alt: "Victoria Photography Hero - Beautiful wedding photography"
        }}
        subtitle="Wedding photography in scotland"
        heading="When you're not just mouth happy, you're eyeball happy!"
        primaryButton={{
          text: "Book a free consultation",
          link: "/contact#book-consultation",
          ariaLabel: "Book a free consultation"
        }}
        secondaryButton={{
          text: "View my photography",
          link: "/photography",
          ariaLabel: "View my photography"
        }}
      />
      <CarouselSection
        title="So, you're getting married, huh?"
        description="Your wedding day should be a joyous celebration, filled with hugs, dance moves, and romantic moments that feel like a scene out of a fairytale. It's about enjoying every second with your loved ones, immersed in laughter and love. As your wedding photographer, my goal is to make your special day unforgettable by capturing every genuine emotion and spontaneous moment."
        slides={SLIDES}
        options={{ dragFree: true, loop: true }}
      />
      <ScrollSections 
        introHeading="Awesome wedding photography..."
        introDescription="Weddings are....stressful! So let me take some of that stress away by running through just what you can expect from me on the day! It will hopefully put you at ease. I often get told that I feel like I’m part of the wedding itself...which is deliberate."
        sections={[
          {
            image: {
              src: "/vlp-01.jpg",
              alt: "Wedding Photography - Beautiful couple in love"
            },
            heading: "For the bold",
            description: "Your wedding day should be a joyous celebration, filled with hugs, dance moves, and romantic moments that feel like a scene out of a fairytale. It’s about enjoying every second with your loved ones, immersed in laughter and love.",
            buttonText: "We want you as your wedding photographer!",
            buttonLink: "/contact"
          },
          {
            image: {
              src: "/vlp-03.jpg",
              alt: "Sticky scrolling sections - Beautiful couple in love"
            },
            heading: "For the daring",
            description: "Your wedding day should be a joyous celebration, filled with hugs, dance moves, and romantic moments that feel like a scene out of a fairytale. It’s about enjoying every second with your loved ones, immersed in laughter and love.",
            buttonText: "We want you as your wedding photographer!",
            buttonLink: "/contact"
          },
          {
            image: {
              src: "/vlp-05.jpg",
              alt: "Artistic Photography - Timeless wedding memories"
            },
            heading: "For the creative",
            description: "Your wedding day should be a joyous celebration, filled with hugs, dance moves, and romantic moments that feel like a scene out of a fairytale. It’s about enjoying every second with your loved ones, immersed in laughter and love.",
            buttonText: "We want you as your wedding photographer!",
            buttonLink: "/contact"
          }
        ]}
      />
      <ImageTextCarousel
        slides={[
          {
            imageSrc: '/vlp-01.jpg',
            imageAlt: 'Wedding Photography',
            title: 'It begins before your big day!',
            description: 'I’ll meet you for a coffee to get to know you. I’ll ask you about your love story, your wedding plans, and your expectations for your wedding photos. I’ll also show you my portfolio and answer any questions you have.',
          },
          {
            imageSrc: '/vlp-02.jpg',
            imageAlt: 'Natural Photography',
            title: 'Pre-nuptial photoshoot.',
            description: 'I’ll meet you for a coffee to get to know you. I’ll ask you about your love story, your wedding plans, and your expectations for your wedding photos. I’ll also show you my portfolio and answer any questions you have.',
          },
          {
            imageSrc: '/vlp-03.jpg',
            imageAlt: 'Artistic Photography',
            title: "It's time to say 'I do'.",
            description: 'I’ll be there for the morning preparations, right through to the evening celebrations, capturing every genuine emotion and spontaneous moment. Your wedding day should be enjoyable, not stressful, and I’m here to make that happen.',
          }
        ]}
        autoplay={false}
        autoplayDelay={6000}
        showNavigation={true}
        heading="You might be wondering, ‘how will my day go?’"
        description="I’ll be there for the morning preparations, right through to the evening celebrations, capturing every genuine emotion and spontaneous moment. Your wedding day should be enjoyable, not stressful, and I’m here to make that happen."
        showHeading={true}
      />
      <TestimonialSection 
        heading="We couldn't recommend or thank her enough for her amazing work that she does! From making us feel super comfortable in front of the camera and putting up with our awkwardness, everyone who has seen the photos have thought they were amazing."
        author="— Sarah & James"
        backgroundImage="/vlp-01.jpg"
      />
      {/* <AccordionScroll 
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
      /> */}
      <ImageText
        title="So, you wanna know more about me?"
        description="Hey, I'm Vicki, a Fife based photographer snapping weddings over the UK and Europe, and I bloomin love my job! I've been mastering the art of wedding photography in Fife and throughout Scotland for over thirteen years. So, imagine me as that experienced, wise ninja photographer with an eye for capturing your story uniquely and beautifully. I can't wait to capture your story."
        images={[
          { src: "/vicki.jpg", alt: "Victoria Photography - Portrait" },
          { src: "/vlp-01.jpg", alt: "Wedding Photography - Couple Portrait" },
          { src: "/vlp-02.jpg", alt: "Wedding Photography - Ceremony Moment" },
          { src: "/vlp-03.jpg", alt: "Wedding Photography - Reception Celebration" },
          { src: "/vlp-04.jpg", alt: "Wedding Photography - Romantic Moment" },
          { src: "/vlp-05.jpg", alt: "Wedding Photography - Wedding Details" }
        ]}
        variant="right"
        buttonText="View my photography"
        buttonLink="/photography"
      />
      {/* <CardGrid 
        heading="Latest Weddings"
        description="Discover the beautiful love stories I've had the privilege to capture. Each wedding is unique, and every couple has their own special story to tell."
        buttonText="View All Weddings"
        buttonLink="/weddings"
        showHeading={true}
      /> */}
    </>
  );
}
