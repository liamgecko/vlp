import Hero from "@/components/Hero";
import ImageText from "@/components/ImageText";
import Gallery from "@/components/Gallery";

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
        title="Every moment tells a story"
        description="I believe that the best wedding photos aren't just pictures – they're memories that transport you back to the exact moment they were taken. The nervous excitement before walking down the aisle, the tears of joy during your vows, the laughter shared with friends and family – these are the moments that make your wedding day truly magical."
        imageSrc="/vlp-02.jpg"
        imageAlt="Wedding Photography - Beautiful couple moment"
        variant="right"
        buttonText="Show me your work, Vicki!"
        buttonLink="#portfolio-gallery"
        className="bg-gradient-to-b from-[#FFF4EB] to-sunflower-100"
      />
      
      <Gallery
        id="portfolio-gallery"
        title="Wedding Photography Gallery"
        description="Capturing the magic, emotion, and beauty of your special day. Each moment tells a story, and I'm here to preserve those memories forever."
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
        className="bg-sunflower-100"
      />
    </>
  );
}
