import Hero from "@/components/Hero";
import ImageText from "@/components/ImageText";
import Gallery from "@/components/Gallery";
import { TestimonialSection } from "@/components/ScrollRevealText";

export default function Photography() {
  return (
    <>
      <Hero
        backgroundImage={{
          src: "/vlp-03.jpg",
          alt: "Wedding Photography Portfolio - Romantic wedding moment"
        }}
        subtitle="Wedding photography portfolio"
        heading="No one wants boring wedding photos, do they?"
        primaryButton={{
          text: "OMG, we want you as our photographer!",
          link: "/contact#book-consultation",
          ariaLabel: "OMG, we want you as our photographer!"
        }}
        secondaryButton={{
          text: "Let me see your work",
          link: "#portfolio-gallery",
          ariaLabel: "Let me see your work"
        }}
      />
      
      <ImageText
        title="I'm the worst influence you could ever have"
        description="So as your wedding photographer, I intend to be near enough the worst influence imaginable. The swift paw sneaking you a ‘way too early’ Jagerbomb; the mysterious hand that nudges you onto the dancefloor; the little voice saying the dick joke everyone’s thinking*. I love working with couples who throw out the rule book out and do your day your way. Weddings that are jam packed with fun, personality and colour. I can’t wait to tell the story of your awesome day."
        imageSrc="/vlp-02.jpg"
        imageAlt="Wedding Photography - Beautiful couple moment"
        variant="right"
        buttonText="Show me your work, Vicki!"
        buttonLink="#portfolio-gallery"
        className="bg-gradient-to-b from-[#FFF4EB] to-sunflower-100"
      />
      
      <Gallery
        id="portfolio-gallery"
        title="Some snaps from the archive"
        description="Browse my photography for some epic portraits, candid moments, beautiful details and more. If you’d like to see more, just shoot me a message and I’d be happy to send some over for you."
        className="bg-[#FFF4EB]"
        images={[
          {
            src: "/vlp-01.jpg",
            alt: "Wedding couple portrait in romantic setting",
            width: 400,
            height: 600,
            title: "Romantic couple portrait"
          },
          {
            src: "/vlp-02.jpg",
            alt: "Wedding ceremony moment",
            width: 400,
            height: 500,
            title: "Ceremony moment"
          },
          {
            src: "/vlp-03.jpg",
            alt: "Wedding reception celebration",
            width: 400,
            height: 300,
            title: "Reception celebration"
          },
          {
            src: "/vlp-04.jpg",
            alt: "Wedding details and decorations",
            width: 400,
            height: 400,
            title: "Wedding details"
          },
          {
            src: "/vlp-05.jpg",
            alt: "Wedding group photo",
            width: 400,
            height: 500,
            title: "Group celebration"
          },
          {
            src: "/vlp-01.jpg",
            alt: "Wedding couple walking together",
            width: 400,
            height: 300,
            title: "Couple walking"
          },
          {
            src: "/vlp-02.jpg",
            alt: "Wedding ring exchange",
            width: 400,
            height: 400,
            title: "Ring exchange"
          },
          {
            src: "/vlp-03.jpg",
            alt: "Wedding dance moment",
            width: 400,
            height: 600,
            title: "First dance"
          },
          {
            src: "/vlp-04.jpg",
            alt: "Wedding bouquet toss",
            width: 400,
            height: 500,
            title: "Bouquet toss"
          }
        ]}
      />
      <TestimonialSection
        heading="Vic you have a wonderful talent of capturing these once in a life time moments through your photography. People tell you that your wedding day goes by in the blink of an eye and that could not be more true. Through your amazing photography we have been able to live that day over and over again. I honestly didn’t believe it was possible to capture such precious moments as they happen, but you exceeded capturing these moments."
        author="— Madi Holyk"
        backgroundImage="/vlp-01.jpg"
      />
    </>
  );
}
